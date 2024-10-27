import prisma from '../config/prisma.js';
import i18next from '../i18n.js';
import { StatusCodes } from 'http-status-codes';

export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await prisma.suppliers.findMany();
    res.status(StatusCodes.OK).json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: i18next.t('supplier.retrieveError', { message: error.message }) });
  }
};

export const getSupplierById = async (req, res) => {
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
  const { name, address, contact } = req.body;

  try {
    const newSupplier = await prisma.suppliers.create({
      data: { name, address, contact },
    });

    res.status(StatusCodes.CREATED).json(newSupplier);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: i18next.t('supplier.creationError', { message: error.message }) });
  }
};

export const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { name, address, contact } = req.body;

  try {
    const existingSupplier = await prisma.suppliers.findUnique({ where: { id: parseInt(id) } });

    if (!existingSupplier) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: i18next.t('supplier.notFound') });
    }

    const updatedSupplier = await prisma.suppliers.update({
      where: { id: parseInt(id) },
      data: { name, address, contact },
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
    const existingSupplier = await prisma.suppliers.findUnique({ where: { id: parseInt(id) } });

    if (!existingSupplier) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: i18next.t('supplier.notFound') });
    }

    await prisma.suppliers.delete({ where: { id: parseInt(id) } });

    res.status(StatusCodes.OK).json({ message: i18next.t('supplier.deletionSuccess') });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: i18next.t('supplier.deletionError', { message: error.message }) });
  }
};
