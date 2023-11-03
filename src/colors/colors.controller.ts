// External Modules
import { Request, Response } from "express"
import { IBaseColor, IColor } from "../interfaces/objects.interface"
import * as ColorsValidation from "./colors.validation"
import * as ColorsService from "./colors.service"
import { errorHandler } from "../middleware/error.handlers"

// Controllers
const create = async (req: Request, res: Response) => {
	try {
		const color: IColor = res.locals.validColor
		color.color_id = new Date().valueOf() // add color ID
		const newColor: IColor = await ColorsService.create(color)
		res.status(201).json(newColor)
	} catch (err) {
		errorHandler(err, res)
	}
}

const read = async (req: Request, res: Response) => {
	try {
		res.json(res.locals.foundColor)
	} catch (err) {
		errorHandler(err, res)
	}
}

const update = async (req: Request, res: Response) => {
	try {
		const updatedColor: IBaseColor = res.locals.validColor
		const id: number = parseInt(res.locals.foundColor.color_id)
		const responseColor: IColor = await ColorsService.update(
			updatedColor,
			id,
		)
		res.json(responseColor)
	} catch (err) {
		errorHandler(err, res)
	}
}

const destroy = async (req: Request, res: Response) => {
	try {
		const id: number = parseInt(res.locals.foundColor.color_id)
		const response: void = await ColorsService.destroy(id)
		res.json(response)
	} catch (err) {
		errorHandler(err, res)
	}
}

// Exports
export const ColorsController = {
	create: [
		ColorsValidation.isValidColor,
		ColorsValidation.appendData,
		create,
	],
	read: [ColorsValidation.colorExists, read],
	update: [
		ColorsValidation.colorExists,
		ColorsValidation.isValidColor,
		update,
	],
	delete: [ColorsValidation.colorExists, destroy],
}
