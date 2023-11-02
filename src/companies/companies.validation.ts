import { Request, Response, NextFunction } from "express"
import { ICompany, IUser } from "../interfaces/objects.interface"


// Functions
export const appendData = async (
    req: Request,
    res: Response,
    next: NextFunction
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