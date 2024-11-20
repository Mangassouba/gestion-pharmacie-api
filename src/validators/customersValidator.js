import { check, param, validationResult } from "express-validator";
import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";

export const createClientValidator = [
  check("firstName")
    .notEmpty()
    .withMessage("First name is required.")
    .bail()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage("First name contains invalid characters.")
    .bail()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long.")
    .bail(),

  check("lastName")
    .notEmpty()
    .withMessage("Last name is required.")
    .bail()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage("Last name contains invalid characters.")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long.")
    .bail(),

  check("phone")
    .notEmpty()
    .withMessage("Phone number is required.")
    .bail()
    .matches(/^[0-9]+$/)
    .withMessage("Phone number contains invalid characters.")
    .bail()
    .isLength({ min: 8, max: 15 })
    .withMessage("Phone number must be between 8 and 15 characters.")
    .bail()
    .custom(async value => {
      const existingCustomer = await prisma.customers.findUnique({
        where: { phone: value }
      });
      if (existingCustomer) {
        throw new Error("This phone number is already in use.");
      }
      return true;
    }),

  check("address")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Address must be at least 5 characters long.")
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

export const updateClientValidator = [
  param("id")
    .notEmpty()
    .withMessage("ID is required.")
    .bail()
    .custom(async value => {
      const customer = await prisma.customers.findUnique({
        where: { id: parseInt(value) }
      });
      if (!customer) {
        throw new Error("Customer does not exist.");
      }
      return true;
    }),

  check("firstName")
    .optional()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long.")
    .bail()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage("First name contains invalid characters.")
    .bail(),

  check("lastName")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long.")
    .bail()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage("Last name contains invalid characters.")
    .bail(),

  check("phone")
    .optional()
    .matches(/^[0-9]+$/)
    .withMessage("Phone number contains invalid characters.")
    .bail()
    .isLength({ min: 8, max: 15 })
    .withMessage("Phone number must be between 8 and 15 characters.")
    .bail()
    .custom(async (value, { req }) => {
      const existingCustomer = await prisma.customers.findUnique({
        where: { phone: value }
      });
      if (existingCustomer && existingCustomer.id !== parseInt(req.params.id)) {
        throw new Error("This phone number is already in use.");
      }
      return true;
    }),

  check("address")
    .optional()
    .isLength({ min: 5 })
    .withMessage("Address must be at least 5 characters long.")
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

export const deleteClientValidator = [
  param("id")
    .notEmpty()
    .withMessage("ID is required.")
    .bail()
    .custom(async value => {
      const customer = await prisma.customers.findUnique({
        where: { id: parseInt(value) }
      });
      if (!customer) {
        throw new Error("Customer does not exist.");
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

export const getClientByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("ID is required.")
    .bail()
    .custom(async value => {
      const customer = await prisma.customers.findUnique({
        where: { id: parseInt(value) }
      });
      if (!customer) {
        throw new Error("Customer does not exist.");
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