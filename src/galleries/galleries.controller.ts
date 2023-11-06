// External Modules
import { NextFunction, Request, Response, response } from "express"
import {
	IBaseGallery,
	IBaseGalleryColor,
	IColor,
	IGallery,
	IGalleryColor,
	IVideo,
} from "../interfaces/objects.interface"
import * as GalleriesService from "./galleries.service"
import { errorHandler } from "../middleware/error.handlers"
import {
	appendData,
	galleryExists,
	isValidGallery,
	appendChildren,
	isValidGalleryColor,
	galleryColorExists,
} from "./galleries.validation"

// Controllers
const create = async (req: Request, res: Response) => {
	try {
		const gallery: IGallery = res.locals.validGallery
		if (!gallery.gallery_id) gallery.gallery_id = new Date().valueOf() // add gallery ID
		const newGallery: IGallery = await GalleriesService.create(gallery)
		res.status(201).json(newGallery)
	} catch (err) {
		errorHandler(err, res)
	}
}

const read = async (req: Request, res: Response) => {
	try {
		const gallery: IGallery = res.locals.foundGallery
		const id: number = gallery.gallery_id
		gallery.videos = await GalleriesService.listVideos(id)
		res.json(gallery)
	} catch (err) {
		errorHandler(err, res)
	}
}

const update = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const updatedGallery: IBaseGallery = res.locals.validGallery
		const id: number = parseInt(res.locals.foundGallery.gallery_id)
		const response: IGallery = await GalleriesService.update(
			updatedGallery,
			id,
		)
		res.locals.foundGallery = response
		return next()
	} catch (err) {
		errorHandler(err, res)
	}
}

const destroy = async (req: Request, res: Response) => {
	try {
		const id: number = parseInt(res.locals.foundGallery.gallery_id)
		const response: void = await GalleriesService.destroy(id)
		res.json(response)
	} catch (err) {
		errorHandler(err, res)
	}
}

const listVideos = async (req: Request, res: Response) => {
	try {
		const id: number = res.locals.foundGallery.gallery_id
		const response: IVideo[] = await GalleriesService.listVideos(id)
		res.json(response)
	} catch (err) {
		errorHandler(err, res)
	}
}

const listGalleryColors = async (req: Request, res: Response) => {
	try {
		const id: number = parseInt(req.params.gallery_id)
		const response: IGalleryColor[] = await GalleriesService.listColors(id)
		res.json(response)
	} catch (err) {
		errorHandler(err, res)
	}
}

const createGalleryColor = async (req: Request, res: Response) => {
	try {
		const galleryColor: IGalleryColor = res.locals.validGalleryColor
		if (!galleryColor.gallery_color_id)
			galleryColor.gallery_color_id = new Date().valueOf() // add id
		const response: IGalleryColor =
			await GalleriesService.createColor(galleryColor)
		res.json(response)
	} catch (err) {
		errorHandler(err, res)
	}
}

const updateGalleryColor = async (req: Request, res: Response) => {
	try {
		const updatedGalleryColor: IBaseGalleryColor =
			res.locals.validGalleryColor
		const id: number = parseInt(
			res.locals.foundGalleryColor.gallery_color_id,
		)
		const response: IGalleryColor = await GalleriesService.updateColor(
			updatedGalleryColor,
			id,
		)
		res.json(response)
	} catch (err) {
		errorHandler(err, res)
	}
}

// Exports
export const GalleriesController = {
	create: [isValidGallery, appendData, create],
	read: [galleryExists, appendChildren, read],
	update: [galleryExists, isValidGallery, update, appendChildren, read],
	delete: [galleryExists, destroy],
	listVideos: [galleryExists, listVideos],
	listGalleryColors,
	createGalleryColor: [isValidGalleryColor, createGalleryColor],
	updateGalleryColor: [
		galleryColorExists,
		isValidGalleryColor,
		updateGalleryColor,
	],
}
