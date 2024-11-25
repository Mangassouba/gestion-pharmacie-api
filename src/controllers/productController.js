import prisma from "../config/prisma.js";
import i18next from "../i18n.js";

export const createProduct = async (req, res) => {
  const { name, description, stock, sale_price, purchase_price, threshold, prescription_req, barcode } = req.body;
  const userId = req.user.userId;

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
        barcode,
        userId 
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: i18next.t('product.creationError') });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany({
      orderBy: { id: 'desc' }
    });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: i18next.t('product.fetchAllError') });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.products.findUnique({
      where: { id: parseInt(id) },
    });

    if (!product) {
      return res.status(404).json({ error: i18next.t('product.notFound') });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error retrieving the product:', error);
    res.status(500).json({ error: i18next.t('product.fetchError') });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, stock, sale_price, purchase_price, threshold, prescription_req, barcode } = req.body;
  const userId = req.user.userId;

  try {
    const existingProduct = await prisma.products.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: i18next.t('product.notFound') });
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
        barcode,
        userId 
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating the product:', error);
    res.status(500).json({ error: i18next.t('product.updateError') });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const existingProduct = await prisma.products.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: i18next.t('product.notFound') });
    }

    await prisma.products.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: i18next.t('product.deletionSuccess') });
  } catch (error) {
    console.error('Error deleting the product:', error);
    res.status(500).json({ error: i18next.t('product.deletionError') });
  }
};


export const getProductStatistics = async (req, res) => {
  try {
    // Nombre total de produits en stock (stock > 0)
    const inStockCount = await prisma.products.count({
      where: {
        stock: { gt: 0 },
      },
    });

    // Nombre de produits en rupture de stock (stock < seuil)
    const outOfStockCount = await prisma.products.count({
      where: {
        stock: { lt: prisma.products.threshold },
      },
    });

    res.status(200).json({
      inStockCount,
      outOfStockCount,
    });
  } catch (error) {
    console.error("Error retrieving product statistics:", error);
    res.status(500).json({ error: i18next.t('product.statisticsError') });
  }
};
