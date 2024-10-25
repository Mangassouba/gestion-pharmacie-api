import { check, param, validationResult } from "express-validator";
import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";

// Validator for creating or updating a batch
const batchValidator = [
  check("batch_number").notEmpty().withMessage("Batch number is required"),
  check("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),
  check("expiration_date")
    .notEmpty()
    .isISO8601()
    .toDate()
    .withMessage("A valid expiration date is required"),
  check("productId")
    .notEmpty()
    .isInt()
    .custom(async (value) => {
      const product = await prisma.products.findUnique({
        where: { id: value },
      });
      if (!product) {
        throw new Error("Associated product does not exist");
      }
    })
    .withMessage("Product ID must be valid"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  },
];

// Validator for deleting a batch by ID
const deleteBatchValidator = [
  param("id")
    .notEmpty()
    .isInt()
    .custom(async (value) => {
      const batch = await prisma.batches.findUnique({
        where: { id: Number(value) },
      });
      if (!batch) {
        throw new Error("Batch not found");
      }
    })
    .withMessage("Batch ID must be valid"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
    }
    next();
  },
];

const batchIdValidator = [
    param("id")
      .notEmpty()
      .withMessage("ID is required")
      .isInt({ min: 1 })
      .withMessage("ID must be a positive integer")
      .custom(async (value) => {
        const batch = await prisma.batches.findUnique({
          where: { id: Number(value) },
        });
        if (!batch) {
          throw new Error("Batch not found");
        }
      }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
      }
      next();
    },
  ];
  
  // Validator for batch creation or update
  const batchupdateValidator = [
    check("batch_number").notEmpty().withMessage("Batch number is required"),
    check("quantity")
      .isInt({ min: 0 })
      .withMessage("Quantity must be a non-negative integer"),
    check("expiration_date")
      .notEmpty()
      .isISO8601()
      .toDate()
      .withMessage("A valid expiration date is required"),
    check("productId")
      .notEmpty()
      .isInt()
      .custom(async (value) => {
        const product = await prisma.products.findUnique({
          where: { id: value },
        });
        if (!product) {
          throw new Error("Associated product does not exist");
        }
      })
      .withMessage("Product ID must be valid"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
      }
      next();
    },
  ];

export { batchValidator,batchIdValidator,batchupdateValidator, deleteBatchValidator };
