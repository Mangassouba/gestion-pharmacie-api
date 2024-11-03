import { check, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js"; // Ensure Prisma is correctly imported

// Function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }
  next();
};

// Validator for adding a new product
const addProductValidator = [
  check("name")
    .notEmpty()
    .withMessage("Product name is required!")
    .isLength({ min: 3 })
    .withMessage("Product name must be at least 3 characters long."),
  check("stock")
    .notEmpty()
    .withMessage("Stock quantity is required!")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer."),
  check("sale_price")
    .notEmpty()
    .withMessage("Sale price is required!")
    .isFloat({ min: 0 })
    .withMessage("Sale price must be a positive number."),
  check("purchase_price")
    .notEmpty()
    .withMessage("Purchase price is required!")
    .isFloat({ min: 0 })
    .withMessage("Purchase price must be a positive number."),
  check("threshold")
    .notEmpty()
    .withMessage("Threshold is required!")
    .isInt({ min: 0 })
    .withMessage("Threshold must be a non-negative integer."),
  check("prescription_req")
    .notEmpty()
    .withMessage("Prescription requirement status is required!")
    .isBoolean()
    .withMessage("Prescription requirement must be a boolean value."),
  check("barcode")
    .notEmpty()
    .withMessage("Barcode is required!")
    .bail()
    .custom(async (value) => {
      const product = await prisma.products.findUnique({ where: { barcode: value } });
      if (product) {
        throw new Error("Barcode must be unique.");
      }
      return true;
    }),
  handleValidationErrors,
];

// Validator for deleting a product by ID
const deleteProductValidator = [
  param("id")
    .notEmpty()
    .withMessage("Product ID is required!")
    .bail()
    .custom(async (value) => {
      const product = await prisma.products.findUnique({ where: { id: parseInt(value, 10) } });
      if (!product) {
        throw new Error("This product does not exist!");
      }
      return true;
    }),
  handleValidationErrors,
];

// Validator for updating a product by ID
const updateProductValidator = [
  param("id")
    .notEmpty()
    .withMessage("Product ID is required!")
    .bail()
    .custom(async (value) => {
      const product = await prisma.products.findUnique({ where: { id: parseInt(value, 10) } });
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
  check("barcode")
    .optional()
    .custom(async (value, { req }) => {
      const product = await prisma.products.findUnique({ where: { barcode: value } });
      if (product && product.id !== parseInt(req.params.id, 10)) {
        throw new Error("Barcode must be unique.");
      }
      return true;
    }),
  handleValidationErrors,
];

// Validator for getting a product by ID
const getProductByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("Product ID is required!")
    .bail()
    .custom(async (value) => {
      const product = await prisma.products.findUnique({ where: { id: parseInt(value, 10) } });
      if (!product) {
        throw new Error("This product does not exist!");
      }
      return true;
    }),
  handleValidationErrors,
];

export {
  addProductValidator,
  deleteProductValidator,
  updateProductValidator,
  getProductByIdValidator,
};
