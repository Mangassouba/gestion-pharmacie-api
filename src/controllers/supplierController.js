import prisma from '../config/prisma.js';


export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await prisma.suppliers.findMany();
    res.status(200).json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while retrieving suppliers' });
  }
};


export const getSupplierById = async (req, res) => {
  const { id } = req.params;

  try {
    const supplier = await prisma.suppliers.findUnique({
      where: { id: parseInt(id) },
    });

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    res.status(200).json(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while retrieving the supplier' });
  }
};


export const createSupplier = async (req, res) => {
  const { name, email, phone, address } = req.body;

  try {
    const newSupplier = await prisma.suppliers.create({
      data: {
        name,
        email,
        phone,
        address,
      },
    });

    res.status(201).json(newSupplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while creating supplier' });
  }
};


export const updateSupplier = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;

  try {
    const existingSupplier = await prisma.suppliers.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingSupplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }

    const updatedSupplier = await prisma.suppliers.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        phone,
        address,
      },
    });

    res.status(200).json(updatedSupplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while updating supplier' });
  }
};


export const deleteSupplier = async (req, res) => {
  const { id } = req.params;

  try {
    const existingSupplier = await prisma.suppliers.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingSupplier) {
      return res.status(404).json({ error: 'Supplier not found' });
    }

    await prisma.suppliers.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Supplier successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while deleting supplier' });
  }
};
