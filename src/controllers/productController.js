import prisma from "../config/prisma.js";
import i18next from "../i18n.js";

export const createProduct = async (req, res) => {
  const { name, description, stock, sale_price, purchase_price, threshold, prescription_req } = req.body;

  try {
    const newProduct = await prisma.products.create({
      data: {
        name,
        description,
        stock,
        sale_price,
        purchase_price,
        threshold,
        prescription_req,
      },
    });

    res.status(201).json(newProduct); 
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: i18next.t('product.creationError') }); // Use translation key
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: i18next.t('product.fetchAllError') }); // Use translation key
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.products.findUnique({
      where: { id: parseInt(id) },
    });

    if (!product) {
      return res.status(404).json({ error: i18next.t('product.notFound') }); // Use translation key
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error retrieving the product:', error);
    res.status(500).json({ error: i18next.t('product.fetchError') }); // Use translation key
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, stock, sale_price, purchase_price, threshold, prescription_req } = req.body;

  try {
    const existingProduct = await prisma.products.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: i18next.t('product.notFound') }); // Use translation key
    }

    const updatedProduct = await prisma.products.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        stock,
        sale_price,
        purchase_price,
        threshold,
        prescription_req,
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating the product:', error);
    res.status(500).json({ error: i18next.t('product.updateError') }); // Use translation key
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const existingProduct = await prisma.products.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: i18next.t('product.notFound') }); // Use translation key
    }

    await prisma.products.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: i18next.t('product.deletionSuccess') }); // Use translation key
  } catch (error) {
    console.error('Error deleting the product:', error);
    res.status(500).json({ error: i18next.t('product.deletionError') }); // Use translation key
  }
};
