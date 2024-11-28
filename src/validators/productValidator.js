import { check, param, validationResult } from "express-validator";
import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";

// Validator for creating a product
export const addProductValidator = [
  check("name")
  .trim()
    .notEmpty()
    .withMessage("The product name is required and cannot be only spaces.")
    .bail()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage("The product name contains invalid characters.")
    .bail()
    .isLength({ min: 2 })
    .withMessage("The name must be at least 2 characters long.")
    .bail(),
    check("description")
  .trim()
  .notEmpty()
  .withMessage("Description is required and cannot be only spaces.")
  .bail(),

    check("barcode")
    .trim()
    .notEmpty()
    .withMessage("The barcode is required and cannot be only spaces.")
    .bail()
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage("The barcode must contain only letters and numbers.")
    .bail()
    .isLength({ min: 8, max: 15 })
    .withMessage("The barcode must be between 8 and 15 characters long.")
    .bail()
    .custom(async value => {
      const existingBarcode = await prisma.products.findUnique({
        where: { barcode: value }
      });
      if (existingBarcode) {
        throw new Error("This barcode is already in use.");
      }
      return true;
    }),

  check("stock")
  .trim()
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive integer.")
    .bail(),

  check("sale_price")
  .trim()
    .isFloat({ min: 0 })
    .withMessage("Sale price must be a positive integer.")
    .bail(),

  check("purchase_price")
  .trim()
    .isFloat({ min: 0 })
    .withMessage("Purchase price must be a positive integer.")
    .bail(),

  check("threshold")
    .isInt({ min: 0 })
    .withMessage("Threshold must be a positive integer.")
    .bail(),

  check("prescription_req")
    .isBoolean()
    .withMessage("'Prescription required' must be a boolean.")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  }
];

// Validator for updating a product
export const updateProductValidator = [
  param("id")
    .notEmpty()
    .withMessage("The product ID is required and cannot be only spaces.")
    .bail()
    .custom(async value => {
      const product = await prisma.products.findUnique({
        where: { id: parseInt(value) }
      });
      if (!product) {
        throw new Error("The product does not exist.");
      }
      return true;
    }),

  check("name")
  .trim()
    .optional()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage("The product name contains invalid characters.")
    .bail()
    .isLength({ min: 2 })
    .withMessage("The name must be at least 2 characters long.")
    .bail(),

    check("barcode")
    .trim()
    .optional()
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage("The barcode must contain only letters and numbers.")
    .bail()
    .isLength({ min: 8, max: 15 })
    .withMessage("The barcode must be between 8 and 15 characters long.")
    .bail()
    .custom(async (value, { req }) => {
      const productId = parseInt(req.params.id); // Récupère l'ID du produit
      const existingProduct = await prisma.products.findUnique({
        where: { id: productId }
      });

      if (existingProduct && existingProduct.barcode === value) {
        // Si le code-barres est le même que l'actuel, pas d'erreur
        return true;
      }

      // Vérifie si un autre produit a déjà ce code-barres
      const barcodeInUse = await prisma.products.findUnique({
        where: { barcode: value }
      });

      if (barcodeInUse) {
        throw new Error("This barcode is already in use.");
      }

      return true;
    }),

  check("stock")
  .trim()
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive integer.")
    .bail(),

  check("sale_price")
  .trim()
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Sale price must be a positive integer.")
    .bail(),

  check("purchase_price")
  .trim()
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Purchase price must be a positive integer.")
    .bail(),

  check("threshold")
  .trim()
    .optional()
    .isInt({ min: 0 })
    .withMessage("Threshold must be a positive integer.")
    .bail(),

  check("prescription_req")
    .optional()
    .isBoolean()
    .withMessage("'Prescription required' must be a boolean.")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  }
];

// Validator for deleting a product
export const deleteProductValidator = [
  param("id")
    .notEmpty()
    .withMessage("The product ID is required.")
    .bail()
    .custom(async value => {
      const product = await prisma.products.findUnique({
        where: { id: parseInt(value) }
      });
      if (!product) {
        throw new Error("The product does not exist.");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  }
];
export const getProductByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("The product ID is required.")
    .bail()
    .isInt({ min: 1 })
    .withMessage("The product ID must be a valid positive integer.")
    .bail()
    .custom(async value => {
      const product = await prisma.products.findUnique({
        where: { id: parseInt(value) }
      });
      if (!product) {
        throw new Error("The product does not exist.");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  }
];