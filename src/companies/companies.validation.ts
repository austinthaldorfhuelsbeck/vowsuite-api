/**
 * Required External Modules and Interfaces
 */
import { Request, Response, NextFunction } from "express"
import * as CompaniesService from "./companies.service"
import { BaseCompany, Company } from "./company.interface"
import { errorHandler } from "../middleware/error.handlers"

/**
 * Middleware Definitions
 */
export const isValidCompany = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Get company from create/update req
    const company: BaseCompany = req.body
    // Build error message
    let message: string = ""
    if (!company.user_id) message += "User ID required. "
    if (!company.company_name) message += "Company name required."
    // Return err or pass thru locals
    if (message !== "") {
        errorHandler({ status: 400, message }, res)
    } else {
        res.locals.validCompany = company
        return next()
    }
}

export const companyExists = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Get ID from param or req body
    let id: string = ""
    if (req.params.company_id) {
        id = req.params.company_id
    } else if (req.body.data.company_id) {
        id = req.body.data.company_id
    } else {
        errorHandler({ status: 400, message: "Company ID required." }, res)
    }
    // Read the company
    const company: Company = await CompaniesService.read(parseInt(id))
    // Return if found
    if (company) {
        res.locals.foundCompany = company
        return next()
    }
    errorHandler({ status: 404, message: `Company ${id} cannot be found.` }, res)
}

export const appendData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Get company from locals
    const company: Company = res.locals.validCompany
    // Append placeholder img URL if none provided
    if (!company.img_URL) {
        company.img_URL = "https://i.stack.imgur.com/HQwHI.jpg"
    }
    // Append hex data if none provided
    if (!company.hex1) {
        company.hex1 = "c39a32"
    }
    if (!company.hex2) {
        company.hex2 = "f3efe0"
    }
    if (!company.hex3) {
        company.hex3 = "d9bb6d"
    }
    // Append created date if none provided
    if (!company.created_at) {
        company.created_at = new Date()
    }
    // Append updated date
    company.updated_at = new Date()
    // Pass thru completed object
    res.locals.validCompany = company
    return next()
}