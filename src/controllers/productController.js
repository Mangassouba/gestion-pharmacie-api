import prisma from "../config/prisma.js";

export const createProduct = async (req, res) => {
  const { name, description, stock, salePrice, purchasePrice, threshold, requiresPrescription } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        stock,
        salePrice,
        purchasePrice,
        threshold,
        requiresPrescription,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while creating product' });
  }
};

export const getAllProducts = async (req, res) => {
    try {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error while retrieving products' });
    }
  };

  export const getProductById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error while retrieving the product' });
    }
  };

  export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, stock, salePrice, purchasePrice, threshold, requiresPrescription } = req.body;
  
    try {
      const existingProduct = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const updatedProduct = await prisma.product.update({
        where: { id: parseInt(id) },
        data: {
          name,
          description,
          stock,
          salePrice,
          purchasePrice,
          threshold,
          requiresPrescription,
        },
      });
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error while updating the product' });
    }
  };

  export const deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const existingProduct = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      await prisma.product.delete({
        where: { id: parseInt(id) },
      });
  
      res.status(200).json({ message: 'Product successfully deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error while deleting the product' });
    }
  };
  