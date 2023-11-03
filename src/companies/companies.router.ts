// External Modules
import express from "express"

import { CompaniesController } from "./companies.controller"
import { methodNotAllowed } from "../middleware/error.handlers"

// Router
export const companiesRouter = express.Router()

// Routes
companiesRouter
	.route("/")
	.get(CompaniesController.readByUserId)
	.post(CompaniesController.create)
	.all(methodNotAllowed)
companiesRouter
	.route("/:company_id")
	.get(CompaniesController.read)
	.put(CompaniesController.update)
	.delete(CompaniesController.delete)
	.all(methodNotAllowed)
companiesRouter
	.route("/:company_id/urls")
	.get(CompaniesController.listCompanyUrls)
	.post(CompaniesController.createCompanyUrl)
	.all(methodNotAllowed)
companiesRouter
	.route("/urls/:company_url_id")
	.put(CompaniesController.updateCompanyUrl)
	.all(methodNotAllowed)
companiesRouter
	.route("/:company_id/colors")
	.get(CompaniesController.listCompanyColors)
	.post(CompaniesController.createCompanyColor)
	.all(methodNotAllowed)
companiesRouter
	.route("/:company_id/colors")
	.get(CompaniesController.listCompanyUrls)
	.post(CompaniesController.createCompanyUrl)
	.all(methodNotAllowed)
companiesRouter
	.route("/colors/:company_color_id")
	.put(CompaniesController.updateCompanyColor)
	.all(methodNotAllowed)
