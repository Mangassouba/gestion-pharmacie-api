import { check, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

const addSaleValidator = [
  check("sale_date")
    .not()
    .isEmpty()
    .withMessage("Sale date is required.")
    .isISO8601()
    .withMessage("Sale date must be a valid date format."),
  check("userId")
    .not()
    .isEmpty()
    .withMessage("User ID is required.")
    .bail()
    .custom(async (userId) => {
      const user = await prisma.users.findUnique({ where: { id: userId } });
      if (!user) throw new Error("User not found.");
    }),
  check("details")
    .isArray({ min: 1 })
    .withMessage("At least one detail is required.")
    .bail()
    .custom((details) => {
      details.forEach((detail) => {
        if (!Number.isInteger(detail.quantity) || detail.quantity <= 0) {
          throw new Error("Quantity must be a positive integer.");
        }
        if (typeof detail.price !== "number" || detail.price <= 0) {
          throw new Error("Price must be a positive number.");
        }
      });
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

const getSaleByIdValidator = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Sale ID is required.")
    .bail()
    .custom(async (id) => {
      const sale = await prisma.sales.findUnique({ where: { id: Number(id) } });
      if (!sale) throw new Error("Sale not found.");
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

const updateSaleValidator = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Sale ID is required.")
    .bail()
    .custom(async (id) => {
      const sale = await prisma.sales.findUnique({ where: { id: Number(id) } });
      if (!sale) throw new Error("Sale not found.");
      return true;
    }),
  check("sale_date")
    .optional()
    .isISO8601()
    .withMessage("Sale date must be a valid date format."),
  check("userId")
    .optional()
    .custom(async (userId) => {
      const user = await prisma.users.findUnique({ where: { id: userId } });
      if (!user) throw new Error("User not found.");
      return true;
    }),
  check("details")
    .optional()
    .isArray()
    .withMessage("Details should be an array.")
    .bail()
    .custom((details) => {
      details.forEach((detail) => {
        if (!Number.isInteger(detail.quantity) || detail.quantity <= 0) {
          throw new Error("Quantity must be a positive integer.");
        }
        if (typeof detail.price !== "number" || detail.price <= 0) {
          throw new Error("Price must be a positive number.");
        }
      });
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
const deleteSaleValidator = [
    param("id")
      .notEmpty()
      .withMessage("Sale ID is required!")
      .bail()
      .isInt({ min: 1 })
      .withMessage("Sale ID must be a positive integer.")
      .bail()
      .custom(async (id) => {
        const sale = await prisma.sales.findUnique({
          where: { id: parseInt(id, 10) },
        });
        if (!sale) {
          throw new Error("This sale does not exist!");
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

export { addSaleValidator, getSaleByIdValidator, updateSaleValidator, deleteSaleValidator  };
