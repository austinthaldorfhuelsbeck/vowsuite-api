// External Modules
import { Request, Response, NextFunction } from "express"
import * as UsersService from "./users.service"
import * as CompaniesService from "../companies/companies.service"
import * as GalleriesService from "../galleries/galleries.service"
import { IBaseUser, IGallery, IUser } from "../interfaces/objects.interface"
import { errorHandler } from "../middleware/error.handlers"

// Functions
export const isValidUser = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get user from create/update req
	const user: IBaseUser = req.body
	// Build error message
	let message: string = ""
	if (!user.user_name) message += "User name required. "
	if (!user.email) message += "Email required."
	// Return err or pass thru locals
	if (message !== "") {
		errorHandler({ status: 400, message }, res)
	} else {
		res.locals.validUser = user
		return next()
	}
}

export const userExists = async (
	req: Request,
	res: Response,
	next: NextFunction,
	id: string = "",
) => {
	// Get ID from param or req body if it
	// didn't come in from query/params
	if (req.params.user_id) {
		id = req.params.user_id
	} else if (req.body.data.user_id) {
		id = req.body.data.user_id
	} else {
		errorHandler({ status: 400, message: "User ID required." }, res)
	}
	// Read the user
	const user: IUser = await UsersService.read(parseInt(id))
	// Return if found
	if (user) {
		res.locals.foundUser = user
		return next()
	}
	errorHandler({ status: 404, message: `User ${id} cannot be found.` }, res)
}

export const galleriesExists = async (
	req: Request,
	res: Response,
	next: NextFunction,
	id: string = "",
) => {
	// Get ID from params
	if (req.params.user_id) {
		id = req.params.user_id
	} else {
		errorHandler({ status: 400, message: "User ID required." }, res)
	}
	// Read the galleries
	const galleries: IGallery[] = await UsersService.listGalleries(parseInt(id))
	// Return if found
	if (galleries) {
		res.locals.foundGalleries = galleries
		return next()
	}
	errorHandler(
		{ status: 404, message: `Galleries for user ${id} cannot be found.` },
		res,
	)
}

export const appendData = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get user from locals
	const user: IUser = res.locals.validUser
	// Add created date if none provided
	if (!user.created_at) {
		user.created_at = new Date()
	}
	// Append updated date
	user.updated_at = new Date()
	// Pass thru completed object
	res.locals.validUser = user
	return next()
}

export const appendChildren = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get user from locals
	const user: IUser = res.locals.foundUser
	const id: number = user.user_id
	// Add company
	user.company = await CompaniesService.readByUserId(id)
	if (user.company?.company_id) {
		user.company.colors = await CompaniesService.listColors(
			user.company.company_id,
		)
		user.company.urls = await CompaniesService.listUrls(
			user.company.company_id,
		)
	}
	// Add galleries
	const galleries: IGallery[] = await UsersService.listGalleries(id)
	user.galleries = galleries
	// Pass thru completed object
	res.locals.validUser = user
	return next()
}

// export const appendGalleriesChildren = async (
// 	req: Request,
// 	res: Response,
// 	next: NextFunction,
// ) => {

// }