// External Modules
import { Request, Response, NextFunction } from "express"
import * as FontsService from "./fonts.service"
import { IBaseFont, IFont } from "../interfaces/objects.interface"
import { errorHandler } from "../middleware/error.handlers"

// Functions
export const isValidFont = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get font from create/update req
	const font: IBaseFont = req.body
	// Build error message
	let message: string = font.font_name ? "" : "Font name required."
	// Return err or pass thru locals
	if (message !== "") {
		errorHandler({ status: 400, message }, res)
	} else {
		res.locals.validFont = font
		return next()
	}
}

export const fontExists = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get ID from param or req body
	let id: string = ""
	if (req.params.font_id) {
		id = req.params.font_id
	} else if (req.body.data.font_id) {
		id = req.body.data.font_id
	} else {
		errorHandler({ status: 400, message: "Font ID required." }, res)
	}
	// Read the font
	const font: IFont = await FontsService.read(parseInt(id))
	// Return if found
	if (font) {
		res.locals.foundFont = font
		return next()
	}
	errorHandler({ status: 404, message: `Font ${id} cannot be found.` }, res)
}

export const appendData = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get font from locals
	const font: IFont = res.locals.validFont
	// Append created date if none provided
	if (!font.created_at) {
		font.created_at = new Date()
	}
	// Append updated date
	font.updated_at = new Date()
	// Pass thru completed object
	res.locals.validFont = font
	return next()
}
