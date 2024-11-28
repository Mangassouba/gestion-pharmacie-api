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
            orderBy: { id: 'desc' }
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
        // Récupérer les détails de la vente
        const sale = await prisma.sales.findUnique({
            where: { id: Number(id) },
            include: { details: true },
        });

        if (!sale) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: i18next.t('sale.notFound'),
            });
        }

        // Restaurer le stock pour chaque produit dans les détails de la vente
        await Promise.all(
            sale.details.map(async (detail) => {
                await prisma.products.update({
                    where: { id: detail.productId },
                    data: { stock: { increment: detail.quantity } },
                });

                // Ajouter un mouvement de stock pour la restauration
                await logStockMovement(detail.productId, detail.quantity, 'sale deletion');
            })
        );

        // Supprimer la vente après la restauration des stocks
        await prisma.sales.delete({
            where: { id: Number(id) },
        });

        res.status(StatusCodes.OK).json({
            message: i18next.t('sale.deletionSuccess'),
        });
    } catch (error) {
        console.log(error);
        if (error.code === 'P2003') {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: i18next.t('sale.deletionErrorReference'),
            });
        }
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: i18next.t('sale.deletionError'),
        });
    }
};


export const getMonthlySales = async (req, res) => {
    try {
        // Requête SQL brute pour regrouper par mois et année
        const monthlySales = await prisma.$queryRaw`
            SELECT 
                EXTRACT(YEAR FROM sale_date) AS year, 
                EXTRACT(MONTH FROM sale_date) AS month, 
                COUNT(*) AS sales_count
            FROM sales
            GROUP BY year, month
            ORDER BY year, month;
        `;

        // Formater les résultats pour les envoyer
        const formattedSales = monthlySales.map((sale) => ({
            year: parseInt(sale.year, 10),
            month: parseInt(sale.month, 10),
            salesCount: parseInt(sale.sales_count, 10),
        }));

        res.status(StatusCodes.OK).json({ monthlySales: formattedSales });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: i18next.t('sale.fetchMonthlyError'),
        });
    }
};

export const getLowStockProducts = async (req, res) => {
    try {
      const lowStockProducts = await prisma.products.findMany({
        where: {
          stock: {
            lte: prisma.products.fields.threshold, // Stock inférieur ou égal au seuil
          },
        },
        select: {
          id: true,
          name: true,
          stock: true,
          threshold: true,
        },
      });
  
      const count = lowStockProducts.length;
  
      res.status(StatusCodes.OK).json({
        count,
        products: lowStockProducts,
      });
    } catch (error) {
      console.error('Error fetching low stock products:', error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Failed to fetch low stock products' });
    }
  };