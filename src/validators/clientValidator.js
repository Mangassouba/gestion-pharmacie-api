import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import prisma from '../config/prisma.js';

// Validator for creating a client
const createClientValidator = [
  check('firstName')
    .not()
    .isEmpty()
    .withMessage('First name is required!')
    .bail()
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters long.'),
  check('lastName')
    .not()
    .isEmpty()
    .withMessage('Last name is required!')
    .bail()
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters long.'),
  check('address')
    .not()
    .isEmpty()
    .withMessage('Address is required!'),
  check('phone')
    .not()
    .isEmpty()
    .withMessage('Phone is required!')
    .bail()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number.'),
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

// Validator for updating a client
const updateClientValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('ID is required!')
    .bail()
    .custom(async (value) => {
      const client = await prisma.clients.findUnique({
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
    .not()
    .isEmpty()
    .withMessage('Address cannot be empty.'),
  check('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number.'),
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

// Validator for deleting a client by ID
const deleteClientValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('ID is required!')
    .bail()
    .custom(async (value) => {
      const client = await prisma.clients.findUnique({
        where: { id: parseInt(value, 10) },
      });
      if (!client) {
        throw new Error('Client not found!');
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

const getClientByIdValidator = [
    param("id")
      .not()
      .isEmpty()
      .withMessage("Client ID is required.")
      .bail()
      .custom(async (value) => {
        const client = await prisma.clients.findUnique({
          where: { id: parseInt(value, 10) },
        });
        if (!client) {
          throw new Error("Client does not exist.");
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
  createClientValidator,
  updateClientValidator,
  deleteClientValidator,
  getClientByIdValidator
};
