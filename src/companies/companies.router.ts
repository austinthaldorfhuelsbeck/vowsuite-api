/**
 * Required External Modules and Interfaces
 */
import express from "express"
import { CompaniesController } from "./companies.controller"
import { methodNotAllowed } from "../middleware/error.handlers"

/**
 * Router Definition
 */
export const companiesRouter = express.Router()

/**
 * Route Definitions
 */
companiesRouter
    .route("/")
    .post(CompaniesController.create)
    .all(methodNotAllowed)
companiesRouter
    .route("/:company_id")
    .get(CompaniesController.read)
    .put(CompaniesController.update)
    .delete(CompaniesController.delete)
    .all(methodNotAllowed)