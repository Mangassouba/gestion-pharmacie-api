import { check, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

const createStockMovementValidator = [
  check("quantity")
    .notEmpty().withMessage("Quantity is required.")
    .isInt({ min: 1 }).withMessage("Quantity must be a positive integer."),
  check("movement_date")
    .notEmpty().withMessage("Movement date is required.")
    .isISO8601().withMessage("Invalid date format."),
  check("type")
    .notEmpty().withMessage("Type is required.")
    .isIn(["IN", "OUT"]).withMessage("Type must be 'IN' or 'OUT'."),
  check("productId")
    .notEmpty().withMessage("Product ID is required.")
    .bail()
    .custom(async (value) => {
      const productExists = await prisma.products.findUnique({ where: { id: parseInt(value, 10) } });
      if (!productExists) throw new Error("Product does not exist.");
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  },
];

const updateStockMovementValidator = [
  param("id")
    .notEmpty().withMessage("Movement ID is required.")
    .isInt({ min: 1 }).withMessage("ID must be a positive integer.")
    .bail()
    .custom(async (value) => {
      const movementExists = await prisma.stockMovements.findUnique({ where: { id: parseInt(value, 10) } });
      if (!movementExists) throw new Error("Stock movement does not exist.");
      return true;
    }),
  ...createStockMovementValidator.slice(0, -1),  // Re-use the same field validations for body fields
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  },
];

const getByIdValidator = [
  param("id")
    .notEmpty().withMessage("Movement ID is required.")
    .isInt({ min: 1 }).withMessage("ID must be a positive integer.")
    .bail()
    .custom(async (value) => {
      const movementExists = await prisma.stockMovements.findUnique({ where: { id: parseInt(value, 10) } });
      if (!movementExists) throw new Error("Stock movement does not exist.");
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  },
];

const deleteValidator = [
  param("id")
    .notEmpty().withMessage("Movement ID is required.")
    .isInt({ min: 1 }).withMessage("ID must be a positive integer.")
    .bail()
    .custom(async (value) => {
      const movementExists = await prisma.stockMovements.findUnique({ where: { id: parseInt(value, 10) } });
      if (!movementExists) throw new Error("Stock movement does not exist.");
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  },
];

export {
  createStockMovementValidator,
  updateStockMovementValidator,
  getByIdValidator,
  deleteValidator,
};
