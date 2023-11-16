// External Modules
import { NextFunction, Request, Response } from "express"
import {
	IBaseCompany,
	IBaseCompanyColor,
	IBaseCompanyUrl,
	IColor,
	ICompany,
	ICompanyColor,
	ICompanyUrl,
} from "../interfaces/objects.interface"

import { errorHandler } from "../middleware/error.handlers"
import {
	isValidCompany,
	isValidCompanyUrl,
	isValidCompanyColor,
	companyExists,
	companyUrlExists,
	companyColorExists,
	appendData,
	appendChildren,
} from "./companies.validation"
import * as CompaniesService from "./companies.service"

// Controllers
const create = async (req: Request, res: Response) => {
	try {
		const company: ICompany = res.locals.validCompany
		const newCompany: ICompany = await CompaniesService.create(company)
		res.json(newCompany)
	} catch (err) {
		errorHandler(err, res)
	}
}

const read = async (req: Request, res: Response) => {
	try {
		const response: ICompany = res.locals.foundCompany
		res.json(response)
	} catch (err) {
		errorHandler(err, res)
	}
}

const update = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const updatedCompany: IBaseCompany = res.locals.validCompany
		const id: number = parseInt(res.locals.foundCompany.company_id)
		const response: ICompany = await CompaniesService.update(
			updatedCompany,
			id,
		)
		res.locals.foundCompany = response
		return next()
	} catch (err) {
		errorHandler(err, res)
	}
}

const destroy = async (req: Request, res: Response) => {
	try {
		const id: number = parseInt(res.locals.foundCompany.company_id)
		const response: void = await CompaniesService.destroy(id)
		res.json(response)
	} catch (err) {
		errorHandler(err, res)
	}
}

const readByUserId = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const id: number = parseInt(String(req.query.user_id))
		const response: ICompany = await CompaniesService.readByUserId(id)
		res.locals.foundCompany = response
		return next()
	} catch (err) {
		errorHandler(err, res)
	}
}

const listCompanyUrls = async (req: Request, res: Response) => {
	try {
		const id: number = parseInt(req.params.company_id)
		const response: ICompanyUrl[] = await CompaniesService.listUrls(id)
		res.json(response)
	} catch (err) {
		errorHandler(err, res)
	}
}

const createCompanyUrl = async (req: Request, res: Response) => {
	try {
		const companyUrl: ICompanyUrl = res.locals.validCompanyUrl
		companyUrl.company_url_id = new Date().valueOf() // add id
		const response: ICompanyUrl =
			await CompaniesService.createUrl(companyUrl)
		res.json(response)
	} catch (err) {
		errorHandler(err, res)
	}
}

const updateCompanyUrl = async (req: Request, res: Response) => {
	try {
		const updatedCompanyUrl: IBaseCompanyUrl = res.locals.validCompanyUrl
		const id: number = parseInt(res.locals.foundCompanyUrl.company_url_id)
		const response: ICompanyUrl = await CompaniesService.updateUrl(
			updatedCompanyUrl,
			id,
		)
		res.json(response)
	} catch (err) {
		errorHandler(err, res)
	}
}

const listCompanyColors = async (req: Request, res: Response) => {
	try {
		const id: number = parseInt(req.params.company_id)
		const response: ICompanyColor[] = await CompaniesService.listColors(id)
		res.json(response)
	} catch (err) {
		errorHandler(err, res)
	}
}

const createCompanyColor = async (req: Request, res: Response) => {
	try {
		const companyColor: ICompanyColor = res.locals.validCompanyColor
		companyColor.company_color_id = new Date().valueOf() // add id
		const response: ICompanyColor =
			await CompaniesService.createColor(companyColor)
		res.json(response)
	} catch (err) {
		errorHandler(err, res)
	}
}

const updateCompanyColor = async (req: Request, res: Response) => {
	try {
		const updatedCompanyColor: IBaseCompanyColor =
			res.locals.validCompanyColor
		const id: number = parseInt(
			res.locals.foundCompanyColor.company_color_id,
		)
		const response: ICompanyColor = await CompaniesService.updateColor(
			updatedCompanyColor,
			id,
		)
		res.json(response)
	} catch (err) {
		errorHandler(err, res)
	}
}

// Exports
export const CompaniesController = {
	create: [isValidCompany, appendData, create],
	read: [companyExists, appendChildren, read],
	update: [companyExists, isValidCompany, update, appendChildren, read],
	delete: [companyExists, destroy],
	readByUserId: [readByUserId, companyExists, appendChildren, read],
	listCompanyUrls,
	createCompanyUrl: [isValidCompanyUrl, createCompanyUrl],
	updateCompanyUrl: [companyUrlExists, isValidCompanyUrl, updateCompanyUrl],
	listCompanyColors,
	createCompanyColor: [isValidCompanyColor, createCompanyColor],
	updateCompanyColor: [
		companyColorExists,
		isValidCompanyColor,
		updateCompanyColor,
	],
}