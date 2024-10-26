import { check, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

const createReceptionValidator = [
  check("reception_date")
    .notEmpty()
    .withMessage("Reception date is required")
    .isISO8601()
    .withMessage("Invalid date format"),
  check("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isInt()
    .custom(async (value) => {
      const user = await prisma.users.findUnique({ where: { id: value } });
      if (!user) {
        throw new Error("User does not exist");
      }
      return true;
    }),
  check("details")
    .isArray({ min: 1 })
    .withMessage("Details must be an array with at least one item"),
  check("details.*.quantity")
    .notEmpty()
    .withMessage("Quantity is required for each detail")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),
  check("details.*.price")
    .notEmpty()
    .withMessage("Price is required for each detail")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  check("details.*.productId")
    .notEmpty()
    .withMessage("Product ID is required for each detail")
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

const getReceptionByIdValidator = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Reception ID must be a positive integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  }
];

const updateReceptionValidator = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Reception ID must be a positive integer"),
  check("reception_date")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format"),
  check("userId")
    .optional()
    .isInt()
    .custom(async (value) => {
      const user = await prisma.users.findUnique({ where: { id: value } });
      if (!user) {
        throw new Error("User does not exist");
      }
      return true;
    }),
  check("details")
    .optional()
    .isArray()
    .withMessage("Details must be an array"),
  check("details.*.quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),
  check("details.*.price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  check("details.*.productId")
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

const deleteReceptionValidator = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Reception ID must be a positive integer"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  }
];

export {
  createReceptionValidator,
  getReceptionByIdValidator,
  updateReceptionValidator,
  deleteReceptionValidator
};
