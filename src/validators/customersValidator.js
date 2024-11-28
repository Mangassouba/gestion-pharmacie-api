import { check, param, validationResult } from "express-validator";
import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";

export const createClientValidator = [
  check("firstName")
  .trim() // Supprime les espaces au début et à la fin
  .notEmpty()
  .withMessage("First name is required and cannot be only spaces.")
  .bail()
  .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/) // Autorise les lettres, espaces internes et caractères spéciaux comme les apostrophes
  .withMessage("First name contains invalid characters.")
  .bail()
  .isLength({ min: 2 })
  .withMessage("First name must be at least 2 characters long.")
  .bail(),

check("lastName")
  .trim()
  .notEmpty()
  .withMessage("Last name is required and cannot be only spaces.")
  .bail()
  .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
  .withMessage("Last name contains invalid characters.")
  .bail()
  .isLength({ min: 2 })
  .withMessage("Last name must be at least 2 characters long.")
  .bail(),

check("phone")
  .trim()
  .notEmpty()
  .withMessage("Phone number is required and cannot be only spaces.")
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
  .trim()
  .optional() 
    .isLength({ min: 3 })
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
  .trim()
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
  .trim()
    .optional()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long.")
    .bail()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage("First name contains invalid characters.")
    .bail(),

  check("lastName")
  .trim()
    .optional()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long.")
    .bail()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage("Last name contains invalid characters.")
    .bail(),

  check("phone")
  .trim()
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
  .trim()
    .optional()
    .isLength({ min: 3 })
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