import { check, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

// Validator for adding a new product
const addProductValidator = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("Product name is required!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Product name must be at least 3 characters long."),
  check("stock")
    .not()
    .isEmpty()
    .withMessage("Stock quantity is required!")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer."),
  check("sale_price")
    .not()
    .isEmpty()
    .withMessage("Sale price is required!")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("Sale price must be a positive number."),
  check("purchase_price")
    .not()
    .isEmpty()
    .withMessage("Purchase price is required!")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("Purchase price must be a positive number."),
  check("threshold")
    .not()
    .isEmpty()
    .withMessage("Threshold is required!")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Threshold must be a non-negative integer."),
  check("prescription_req")
    .not()
    .isEmpty()
    .withMessage("Prescription requirement status is required!")
    .isBoolean()
    .withMessage("Prescription requirement must be a boolean value."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];

// Validator for deleting a product by ID
const deleteProductValidator = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Product ID is required!")
    .bail()
    .custom(async (value) => {
      const product = await prisma.products.findUnique({
        where: { id: parseInt(value, 10) },
      });
      if (!product) {
        throw new Error("This product does not exist!");
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
  },
];

// Validator for updating a product by ID
const updateProductValidator = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Product ID is required!")
    .bail()
    .custom(async (value) => {
      const product = await prisma.products.findUnique({
        where: { id: parseInt(value, 10) },
      });
      if (!product) {
        throw new Error("This product does not exist.");
      }
      return true;
    }),
  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Product name must be at least 3 characters long."),
  check("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer."),
  check("sale_price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Sale price must be a positive number."),
  check("purchase_price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Purchase price must be a positive number."),
  check("threshold")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Threshold must be a non-negative integer."),
  check("prescription_req")
    .optional()
    .isBoolean()
    .withMessage("Prescription requirement must be a boolean value."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];

// Validator for getting a product by ID
const getProductByIdValidator = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Product ID is required!")
    .bail()
    .custom(async (value) => {
      const product = await prisma.products.findUnique({
        where: { id: parseInt(value, 10) },
      });
      if (!product) {
        throw new Error("This product does not exist!");
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
  },
];

export {
  addProductValidator,
  deleteProductValidator,
  updateProductValidator,
  getProductByIdValidator,
};
