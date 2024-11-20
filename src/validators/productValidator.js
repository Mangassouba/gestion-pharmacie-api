import { check, param, validationResult } from "express-validator";
import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";

// Validator for creating a product
export const addProductValidator = [
  check("name")
    .notEmpty()
    .withMessage("The product name is required.")
    .bail()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage("The product name contains invalid characters.")
    .bail()
    .isLength({ min: 2 })
    .withMessage("The name must be at least 2 characters long.")
    .bail(),

    check("barcode")
    .notEmpty()
    .withMessage("The barcode is required.")
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
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive integer.")
    .bail(),

  check("sale_price")
    .isInt({ min: 0 })
    .withMessage("Sale price must be a positive integer.")
    .bail(),

  check("purchase_price")
    .isInt({ min: 0 })
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

  check("name")
    .optional()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage("The product name contains invalid characters.")
    .bail()
    .isLength({ min: 2 })
    .withMessage("The name must be at least 2 characters long.")
    .bail(),

    check("barcode")
    .notEmpty()
    .withMessage("The barcode is required.")
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
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive integer.")
    .bail(),

  check("sale_price")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Sale price must be a positive integer.")
    .bail(),

  check("purchase_price")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Purchase price must be a positive integer.")
    .bail(),

  check("threshold")
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