import prisma from '../config/prisma.js';
import i18next from '../i18n.js';
import { StatusCodes } from 'http-status-codes';

export const getAllSuppliers = async (req, res) => {
  const userId = req.user.userId;
  try {
    const suppliers = await prisma.suppliers.findMany({
      orderBy: { id: 'desc' }
    });
    res.status(StatusCodes.OK).json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: i18next.t('supplier.retrieveError', { message: error.message }) });
  }
};

export const getSupplierById = async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;
  try {
    const supplier = await prisma.suppliers.findUnique({ where: { id: parseInt(id) } });
    if (!supplier) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: i18next.t('supplier.notFound') });
    }
    res.status(StatusCodes.OK).json(supplier);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: i18next.t('supplier.retrieveError', { message: error.message }) });
  }
};

export const createSupplier = async (req, res) => {
  const userId = req.user.userId;
  const { name, address, contact } = req.body;
  try {
    const newSupplier = await prisma.suppliers.create({
      data: { name, address, contact, userId },
    });
    res.status(StatusCodes.CREATED).json(newSupplier);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: i18next.t('supplier.creationError', { message: error.message }) });
  }
};

export const updateSupplier = async (req, res) => {
  const userId = req.user.userId;
  const { id } = req.params;
  const { name, address, contact } = req.body;
  try {
    const existingSupplier = await prisma.suppliers.findUnique({ where: { id: parseInt(id) } });
    if (!existingSupplier) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: i18next.t('supplier.notFound') });
    }
    const updatedSupplier = await prisma.suppliers.update({
      where: { id: parseInt(id) },
      data: { name, address, contact, userId },
    });
    res.status(StatusCodes.OK).json(updatedSupplier);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: i18next.t('supplier.updateError', { message: error.message }) });
  }
};

export const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    const supplierId = parseInt(id);

    // Vérifier si le fournisseur est lié à des réceptions
    const linkedReceptions = await prisma.receptions.findMany({
      where: { supplierId },
    });

    if (linkedReceptions.length > 0) {
      return res.status(400).json({
        message: i18next.t('supplier.hasReceptions'), // Fournisseur lié à des réceptions
      });
    }

    // Supprimer le fournisseur
    await prisma.suppliers.delete({
      where: { id: supplierId },
    });

    res.status(200).json({ message: i18next.t('supplier.deletionSuccess') });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: i18next.t('supplier.deletionError') });
  }
};