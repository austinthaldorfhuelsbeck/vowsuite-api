// External Modules
import { Request, Response, NextFunction } from "express"
import * as ColorsService from "./colors.service"
import { IBaseColor, IColor } from "../interfaces/objects.interface"
import { errorHandler } from "../middleware/error.handlers"

// Functions
export const isValidColor = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get color from create/update req
	const color: IBaseColor = req.body
	// Build error message
	let message: string = color.value ? "" : "Value required."
	// Return err or pass thru locals
	if (message !== "") {
		errorHandler({ status: 400, message }, res)
	} else {
		res.locals.validColor = color
		return next()
	}
}

export const colorExists = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get ID from param or req body
	let id: string = ""
	if (req.params.color_id) {
		id = req.params.color_id
	} else if (req.body.data.color_id) {
		id = req.body.data.color_id
	} else {
		errorHandler({ status: 400, message: "Color ID required." }, res)
	}
	// Read the color
	const color: IColor = await ColorsService.read(parseInt(id))
	// Return if found
	if (color) {
		res.locals.foundColor = color
		return next()
	}
	errorHandler({ status: 404, message: `Color ${id} cannot be found.` }, res)
}

export const appendData = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get color from locals
	const color: IColor = res.locals.validColor
	// Append created date if none provided
	if (!color.created_at) {
		color.created_at = new Date()
	}
	// Append updated date
	color.updated_at = new Date()
	// Pass thru completed object
	res.locals.validColor = color
	return next()
}
