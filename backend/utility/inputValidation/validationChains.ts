import { body } from "express-validator";
import { RequestHandler } from "express";

export function validateInput(formFieldName: string) {
  return () => {
    body(formFieldName)
      .trim()
      .isLength({ min: 1 })
      .withMessage(`${formFieldName} must not be empty`)
      .escape();
  };
}
