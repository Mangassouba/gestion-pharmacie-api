import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import prisma from '../config/prisma.js';

// Function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ errors: errors.array() });
  }
  next();
};

// Validator for creating a new client
const createClientValidator = [
  check('firstName')
    .notEmpty()
    .withMessage('First name is required!')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long.'),
  check('lastName')
    .notEmpty()
    .withMessage('Last name is required!')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters long.'),
  check('address')
    .notEmpty()
    .withMessage('Address is required!'),
  check('phone')
    .notEmpty()
    .withMessage('Phone is required!')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number.')
    .bail()
    .custom(async (value) => {
      const client = await prisma.customers.findUnique({
        where: { phone: value },
      });
      if (client) {
        throw new Error('Phone number must be unique.');
      }
      return true;
    }),
  handleValidationErrors,
];

// Validator for updating a client by ID
const updateClientValidator = [
  param('id')
    .notEmpty()
    .withMessage('ID is required!')
    .bail()
    .custom(async (value) => {
      const client = await prisma.customers.findUnique({
        where: { id: parseInt(value, 10) },
      });
      if (!client) {
        throw new Error('Client not found!');
      }
      return true;
    }),
  check('firstName')
    .optional()
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long.'),
  check('lastName')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters long.'),
  check('address')
    .optional()
    .notEmpty()
    .withMessage('Address cannot be empty.'),
  check('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number.')
    .bail()
    .custom(async (value, { req }) => {
      const client = await prisma.customers.findUnique({
        where: { phone: value },
      });
      if (client && client.id !== parseInt(req.params.id, 10)) {
        throw new Error('Phone number must be unique.');
      }
      return true;
    }),
  handleValidationErrors,
];

// Validator for deleting a client by ID
const deleteClientValidator = [
  param('id')
    .notEmpty()
    .withMessage('ID is required!')
    .bail()
    .custom(async (value) => {
      const client = await prisma.customers.findUnique({
        where: { id: parseInt(value, 10) },
      });
      if (!client) {
        throw new Error('Client not found!');
      }
      return true;
    }),
  handleValidationErrors,
];

// Validator for getting a client by ID
const getClientByIdValidator = [
  param('id')
    .notEmpty()
    .withMessage('Client ID is required.')
    .bail()
    .custom(async (value) => {
      const client = await prisma.customers.findUnique({
        where: { id: parseInt(value, 10) },
      });
      if (!client) {
        throw new Error('Client does not exist.');
      }
      return true;
    }),
  handleValidationErrors,
];

export {
  createClientValidator,
  updateClientValidator,
  deleteClientValidator,
  getClientByIdValidator,
};
