// External Modules
import { Request, Response } from "express"
import { IBaseFont, IFont } from "../interfaces/objects.interface"
import * as FontsValidation from "./fonts.validation"
import * as FontsService from "./fonts.service"
import { errorHandler } from "../middleware/error.handlers"

// Controllers
const create = async (req: Request, res: Response) => {
	try {
		const font: IFont = res.locals.validFont
		font.font_id = new Date().valueOf() // add font ID
		const newFont: IFont = await FontsService.create(font)
		res.status(201).json(newFont)
	} catch (err) {
		errorHandler(err, res)
	}
}

const read = async (req: Request, res: Response) => {
	try {
		res.json(res.locals.foundFont)
	} catch (err) {
		errorHandler(err, res)
	}
}

const update = async (req: Request, res: Response) => {
	try {
		const updatedFont: IBaseFont = res.locals.validFont
		const id: number = parseInt(res.locals.foundFont.font_id)
		const responseFont: IFont = await FontsService.update(updatedFont, id)
		res.json(responseFont)
	} catch (err) {
		errorHandler(err, res)
	}
}

const destroy = async (req: Request, res: Response) => {
	try {
		const id: number = parseInt(res.locals.foundFont.font_id)
		const response: void = await FontsService.destroy(id)
		res.json(response)
	} catch (err) {
		errorHandler(err, res)
	}
}

// Exports
export const FontsController = {
	create: [FontsValidation.isValidFont, FontsValidation.appendData, create],
	read: [FontsValidation.fontExists, read],
	update: [FontsValidation.fontExists, FontsValidation.isValidFont, update],
	delete: [FontsValidation.fontExists, destroy],
}
