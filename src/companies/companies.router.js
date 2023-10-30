"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companiesRouter = void 0;
/**
 * Required External Modules and Interfaces
 */
const express_1 = __importDefault(require("express"));
const companies_controller_1 = require("./companies.controller");
const error_handlers_1 = require("../middleware/error.handlers");
/**
 * Router Definition
 */
exports.companiesRouter = express_1.default.Router();
/**
 * Route Definitions
 */
exports.companiesRouter
    .route("/")
    .post(companies_controller_1.CompaniesController.create)
    .all(error_handlers_1.methodNotAllowed);
exports.companiesRouter
    .route("/:company_id")
    .get(companies_controller_1.CompaniesController.read)
    .put(companies_controller_1.CompaniesController.update)
    .delete(companies_controller_1.CompaniesController.delete)
    .all(error_handlers_1.methodNotAllowed);
