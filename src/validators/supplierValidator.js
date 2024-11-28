import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import prisma from '../config/prisma.js';

const createSupplierValidator = [
  check('name')
  .trim()
    .not()
    .isEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long.')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name must only contain letters and spaces.'),
  check('address')
  .trim()
    .not()
    .isEmpty()
    .withMessage('Address is required.'),
  check('contact')
  .trim()
    .not()
    .isEmpty()
    .withMessage('Contact information is required.')
    .isNumeric()
    .withMessage('Contact must only contain numbers.'),
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

const updateSupplierValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('Supplier ID is required.')
    .custom(async (value) => {
      const supplier = await prisma.suppliers.findUnique({
        where: { id: parseInt(value, 10) },
      });
      if (!supplier) {
        throw new Error('Supplier does not exist.');
      }
      return true;
    }),
  check('name')
  .trim()
    .optional()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long.')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name must only contain letters and spaces.'),
  check('address').trim().optional(),
  check('contact')
  .trim()
    .optional()
    .isNumeric()
    .withMessage('Contact must only contain numbers.'),
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

const deleteSupplierValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('Supplier ID is required.')
    .custom(async (value) => {
      const supplier = await prisma.suppliers.findUnique({
        where: { id: parseInt(value, 10) },
      });
      if (!supplier) {
        throw new Error('Supplier does not exist.');
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

const getSupplierByIdValidator = [
  param('id')
    .not()
    .isEmpty()
    .withMessage('Supplier ID is required.')
    .custom(async (value) => {
      const supplier = await prisma.suppliers.findUnique({
        where: { id: parseInt(value, 10) },
      });
      if (!supplier) {
        throw new Error('Supplier does not exist.');
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
  createSupplierValidator,
  updateSupplierValidator,
  deleteSupplierValidator,
  getSupplierByIdValidator,
};
