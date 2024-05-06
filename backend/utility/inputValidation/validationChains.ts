import { body, ValidationChain } from "express-validator";

export function validateInput(formFieldName: string): ValidationChain[] {
  const fieldMinLength = 4;

  return [
    body(formFieldName)
      .trim()
      .isLength({ min: fieldMinLength })
      .withMessage(
        `${formFieldName} must not be at least ${fieldMinLength} characters long.`
      )
      .escape(),
  ];
}
