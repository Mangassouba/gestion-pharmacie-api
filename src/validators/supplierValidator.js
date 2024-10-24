import { check, param, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import prisma from '../config/prisma.js';

const createSupplierValidator = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long.'),
  check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Please provide a valid email.')
    .custom(async (value) => {
      const existingSupplier = await prisma.suppliers.findUnique({
        where: { email: value },
      });
      if (existingSupplier) {
        throw new Error('A supplier with this email already exists.');
      }
      return true;
    }),
  check('phone')
    .not()
    .isEmpty()
    .withMessage('Phone number is required.')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number.'),
  check('address')
    .not()
    .isEmpty()
    .withMessage('Address is required.'),
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
  check('name').optional().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long.'),
  check('email').optional().isEmail().withMessage('Please provide a valid email.'),
  check('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number.'),
  check('address').optional(),
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
