// External Modules
import { Request, Response, NextFunction } from "express"
import * as CompaniesService from "../companies/companies.service"
import {
	IBaseCompany,
	IBaseCompanyUrl,
	IBaseCompanyColor,
	ICompany,
	ICompanyColor,
	ICompanyUrl,
} from "../interfaces/objects.interface"
import { errorHandler } from "../middleware/error.handlers"

// Functions
export const isValidCompany = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get company from create/update req
	const company: IBaseCompany = req.body
	// Build error message
	let message: string = ""
	if (!company.company_name) message += "Company name required. "
	if (!company.user_id) message += "User ID required."
	// Return err or pass thru locals
	if (message !== "") {
		errorHandler({ status: 400, message }, res)
	} else {
		res.locals.validCompany = company
		return next()
	}
}

export const isValidCompanyUrl = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get company_url from create/update req
	const companyUrl: IBaseCompanyUrl = req.body
	// Build error message
	let message: string = ""
	if (!companyUrl.company_id) message += "Company ID required. "
	if (!companyUrl.label) message += "Label required. "
	if (typeof companyUrl.target !== "string") message += "Target required."
	// Return err or pass thru locals
	if (message !== "") {
		errorHandler({ status: 400, message }, res)
	} else {
		res.locals.validCompanyUrl = companyUrl
		return next()
	}
}

export const isValidCompanyColor = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get company_url from create/update req
	const companyColor: IBaseCompanyColor = req.body
	// Build error message
	let message: string = ""
	if (!companyColor.company_id) message += "Company ID required. "
	if (!companyColor.value) message += "Hex value required. "
	// Return err or pass thru locals
	if (message !== "") {
		errorHandler({ status: 400, message }, res)
	} else {
		res.locals.validCompanyColor = companyColor
		return next()
	}
}

export const companyExists = async (
	req: Request,
	res: Response,
	next: NextFunction,
	id: string = "",
) => {
	// Get ID from param or req body if it
	// didn't come in from query/params
	if (req.params.company_id) {
		id = req.params.company_id
	} else if (req.body.data.company_id) {
		id = req.body.data.company_id
	} else {
		errorHandler({ status: 400, message: "Company ID required." }, res)
	}
	// Read the company
	const company: ICompany = await CompaniesService.read(parseInt(id))
	// Return if found
	if (company) {
		res.locals.foundCompany = company
		return next()
	}
	errorHandler(
		{ status: 404, message: `Company ${id} cannot be found.` },
		res,
	)
}

export const companyUrlExists = async (
	req: Request,
	res: Response,
	next: NextFunction,
	id: string = "",
) => {
	// Get ID from req params
	if (req.params.company_url_id) {
		id = req.params.company_url_id
	} else {
		errorHandler({ status: 400, message: "Company URL ID required." }, res)
	}
	// Read the company url
	const companyUrl: ICompanyUrl = await CompaniesService.readUrl(parseInt(id))
	// Return if found
	if (companyUrl) {
		res.locals.foundCompanyUrl = companyUrl
		return next()
	}
	errorHandler(
		{ status: 404, message: `CompanyUrl ${id} cannot be found.` },
		res,
	)
}

export const companyColorExists = async (
	req: Request,
	res: Response,
	next: NextFunction,
	id: string = "",
) => {
	// Get ID from req params
	if (req.params.company_color_id) {
		id = req.params.company_color_id
	} else {
		errorHandler(
			{ status: 400, message: "Company Color ID required." },
			res,
		)
	}
	// Read the company color
	const companyColor: ICompanyColor = await CompaniesService.readColor(
		parseInt(id),
	)
	// Return if found
	if (companyColor) {
		res.locals.foundCompanyColor = companyColor
		return next()
	}
	errorHandler(
		{ status: 404, message: `CompanyColor ${id} cannot be found.` },
		res,
	)
}

export const appendData = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get company from locals
	const company: ICompany = res.locals.validCompany
	// Add created date if none provided
	if (!company.created_at) {
		company.created_at = new Date()
	}
	// Append updated date
	company.updated_at = new Date()
	// Pass thru completed object
	res.locals.validCompany = company
	return next()
}

export const appendChildren = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get company from locals
	const company: ICompany = res.locals.foundCompany
	// Add urls and colors
	const id: number = company.company_id
	company.urls = await CompaniesService.listUrls(id)
	company.colors = await CompaniesService.listColors(id)
	// Pass thru completed object
	res.locals.validCompany = company
	return next()
}
