import { check, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

const createInventoryValidator = [
  check("inventory_date")
    .notEmpty()
    .withMessage("Inventory date is required")
    .isISO8601()
    .withMessage("Invalid date format"),
  check("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
  check("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isInt()
    .custom(async (value) => {
      const product = await prisma.products.findUnique({ where: { id: value } });
      if (!product) {
        throw new Error("Product does not exist");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  }
];

const getInventoryByIdValidator = [
  param("id").isInt().withMessage("Inventory ID must be an integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  }
];

const updateInventoryValidator = [
  param("id").isInt().withMessage("Inventory ID must be an integer"),
  check("inventory_date")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format"),
  check("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock must be a non-negative integer"),
  check("productId")
    .optional()
    .isInt()
    .custom(async (value) => {
      const product = await prisma.products.findUnique({ where: { id: value } });
      if (!product) {
        throw new Error("Product does not exist");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  }
];

const deleteInventoryValidator = [
  param("id").isInt().withMessage("Inventory ID must be an integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  }
];

export {
  createInventoryValidator,
  getInventoryByIdValidator,
  updateInventoryValidator,
  deleteInventoryValidator
};
