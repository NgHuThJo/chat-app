"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
var express_validator_1 = require("express-validator");
function validateInput(formFieldName) {
    return [
        (0, express_validator_1.body)(formFieldName)
            .trim()
            .isLength({ min: 1 })
            .withMessage("".concat(formFieldName, " must not be empty"))
            .escape(),
        (function (req, res, next) {
            next();
        }),
    ];
}
exports.validateInput = validateInput;
