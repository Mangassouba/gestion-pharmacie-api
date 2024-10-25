import { body, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

const createOrderValidator = [
  body("order_date")
    .not()
    .isEmpty()
    .withMessage("Order date is required!")
    .bail()
    .isISO8601()
    .withMessage("Order date must be a valid ISO 8601 date format."),
  
  body("clientId")
    .not()
    .isEmpty()
    .withMessage("Client ID is required!")
    .bail()
    .isInt()
    .withMessage("Client ID must be an integer."),
  
  body("detailsOrder")
    .not()
    .isEmpty()
    .withMessage("Details Order is required!")
    .bail()
    .isArray()
    .withMessage("Details Order must be an array.")
    .custom((value) => {
      if (value.length === 0) {
        throw new Error("Details Order cannot be empty.");
      }
      return true;
    }),
  
  body("detailsOrder.*.productId")
    .not()
    .isEmpty()
    .withMessage("Product ID is required!")
    .bail()
    .isInt()
    .withMessage("Product ID must be an integer."),
  
  body("detailsOrder.*.quantity")
    .not()
    .isEmpty()
    .withMessage("Quantity is required!")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer."),
  
  body("detailsOrder.*.price")
    .not()
    .isEmpty()
    .withMessage("Price is required!")
    .bail()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number."),

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

const deleteOrderValidator = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Order ID is required!")
    .bail()
    .custom(async (value) => {
      const order = await prisma.orders.findUnique({
        where: { id: parseInt(value, 10) },
      });
      if (!order) {
        throw new Error("This order does not exist!");
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

const updateOrderValidator = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Order ID is required!")
    .bail()
    .custom(async (value) => {
      const order = await prisma.orders.findUnique({
        where: { id: parseInt(value, 10) },
      });
      if (!order) {
        throw new Error("This order does not exist!");
      }
      return true;
    }),
  
  body("order_date")
    .optional()
    .isISO8601()
    .withMessage("Order date must be a valid ISO 8601 date format."),
  
  body("clientId")
    .optional()
    .isInt()
    .withMessage("Client ID must be an integer."),
  
  body("detailsOrder")
    .optional()
    .isArray()
    .withMessage("Details Order must be an array.")
    .custom((value) => {
      if (value && value.length === 0) {
        throw new Error("Details Order cannot be empty.");
      }
      return true;
    }),
  
  body("detailsOrder.*.productId")
    .optional()
    .isInt()
    .withMessage("Product ID must be an integer."),
  
  body("detailsOrder.*.quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer."),
  
  body("detailsOrder.*.price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number."),

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

const getOrderByIdValidator = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Order ID is required!")
    .bail()
    .custom(async (value) => {
      const order = await prisma.orders.findUnique({
        where: { id: parseInt(value, 10) },
      });
      if (!order) {
        throw new Error("This order does not exist!");
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
  createOrderValidator,
  deleteOrderValidator,
  updateOrderValidator,
  getOrderByIdValidator,
};
