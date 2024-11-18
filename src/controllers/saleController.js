import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";
import i18next from '../i18n.js';
import sendStockAlert from "../services/emailService.js";

const logStockMovement = async (productId, quantity, type) => {
    await prisma.stockMovements.create({
        data: {
            quantity,
            movement_date: new Date(),
            type,
            productId,
        },
    });
};

export const createSale = async (req, res) => {
    const { sale_date, customerId, details } = req.body; 
    const userId = req.user.userId;

    try {
        for (const detail of details) {
            const product = await prisma.products.findUnique({
                where: { id: detail.productId },
            });

            if (!product || product.stock < detail.quantity) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: i18next.t('sale.insufficientStock', { productId: detail.productId }) });
            }


            const updatedProduct = await prisma.products.findUnique({
                where: { id: detail.productId },
              });
      
              if (updatedProduct.stock <= updatedProduct.threshold) {
                const admins = await prisma.users.findMany({
                  where: { role: 'ADMIN' },
                  select: { email: true },
                });
      
                const adminEmails = admins.map((admin) => admin.email);
                await sendStockAlert(
                  adminEmails,
                  updatedProduct.name,
                  updatedProduct.stock,
                  updatedProduct.threshold
                );
              }
        }        

        const newSale = await prisma.sales.create({
            data: {
                sale_date,
                userId,
                customerId,
                details: {
                    create: details.map((detail) => ({
                        quantity: detail.quantity,
                        price: detail.price,
                        product: { connect: { id: detail.productId } },
                    })),
                },
            },
        });

        await Promise.all(
            details.map(async (detail) => {
                await prisma.products.update({
                    where: { id: detail.productId },
                    data: { stock: { decrement: detail.quantity } },
                });
                await logStockMovement(detail.productId, -detail.quantity, 'sale');
            })
        );

        res.status(StatusCodes.CREATED).json(newSale);
    } catch (error) {
        console.error('Error creating the sale:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: i18next.t('sale.creationError') });
    }
};


export const getSales = async (req, res) => {
    try {
        const sales = await prisma.sales.findMany({
            include: { details: true, user: true },
        });
        res.status(StatusCodes.OK).json(sales);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: i18next.t('sale.fetchAllError') });
    }
};

export const getSaleById = async (req, res) => {
    const { id } = req.params;
    try {
        const sale = await prisma.sales.findUnique({
            where: { id: Number(id) },
            include: { details: true, user: true },
        });
        if (!sale) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: i18next.t('sale.notFound') });
        }
        res.status(StatusCodes.OK).json(sale);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: i18next.t('sale.fetchError') });
    }
};

export const updateSale = async (req, res) => {
    const { id } = req.params;
    const { sale_date, customerId, details } = req.body;
    const userId = req.user.userId; 

    try {
        const saleExists = await prisma.sales.findUnique({
            where: { id: Number(id) },
            include: { details: true },
        });

        if (!saleExists) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: i18next.t('sale.notFound') });
        }

        await Promise.all(
            saleExists.details.map(async (existingDetail) => {
                const newDetail = details.find(d => d.productId === existingDetail.productId);
                if (newDetail) {
                    const quantityDifference = existingDetail.quantity - newDetail.quantity;

                    await prisma.products.update({
                        where: { id: existingDetail.productId },
                        data: { stock: { increment: quantityDifference } },
                    });

                    if (quantityDifference !== 0) {
                        await logStockMovement(existingDetail.productId, -quantityDifference, 'sale update');
                    }
                }
            })
        );

        const updatedSale = await prisma.$transaction(async (prisma) => {
            await prisma.saleDetails.deleteMany({
                where: { saleId: Number(id) },
            });

            return prisma.sales.update({
                where: { id: Number(id) },
                data: {
                    sale_date,
                    userId,
                    customerId,
                    details: {
                        create: details.map((detail) => ({
                            quantity: detail.quantity,
                            price: detail.price,
                            product: { connect: { id: detail.productId } },
                        })),
                    },
                },
            });
        });

        res.status(StatusCodes.OK).json(updatedSale);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: i18next.t('sale.updateError') });
    }
};


export const deleteSale = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.sales.delete({
            where: { id: Number(id) },
        });
        res.status(StatusCodes.OK).json({ message: i18next.t('sale.deletionSuccess') });
    } catch (error) {
        console.log(error);
        if (error.code === "P2003") {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: i18next.t('sale.deletionErrorReference'),
            });
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: i18next.t('sale.deletionError') });
    }
};

export const getTodaySales = async (req, res) => {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    try {
        // Compte le nombre de ventes pour la journée
        const todaySalesCount = await prisma.sales.count({
            where: {
                sale_date: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });
        res.status(StatusCodes.OK).json({ salesCount: todaySalesCount });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: i18next.t('sale.fetchTodayError'),
        });
    }
};