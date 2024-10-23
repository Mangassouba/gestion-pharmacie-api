import { check, param, validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

const addRequestValidator = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("Name is required!")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long."),
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email is required!")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email.")
    .bail()
    .custom(async (value) => {
      const result = await prisma.user.findUnique({
        where: { email: value },
      });
      if (result) {
        throw new Error("A user with this email already exists!");
      }
      return true;
    }),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required!")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  check("role")
    .not()
    .isEmpty()
    .withMessage("Role is required."),
  check("status")
    .not()
    .isEmpty()
    .withMessage("Status is required."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

const deleteRequestValidator = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("ID is required!")
    .bail()
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(value, 10) },
      });
      if (!user) {
        throw new Error("This user does not exist!");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

const updateValidator = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("ID is required.")
    .bail()
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(value, 10) },
      });
      if (!user) {
        throw new Error("This user does not exist.");
      }
      return true;
    }),
  check("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long."),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  check("role")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Role cannot be empty."),
  check("status")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Status cannot be empty."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    next();
  },
];

const getByIdValidator = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("ID is required.")
    .bail()
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(value, 10) },
      });
      if (!user) {
        throw new Error("This user does not exist.");
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
  addRequestValidator,
  deleteRequestValidator,
  updateValidator,
  getByIdValidator,
};