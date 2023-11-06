// External Modules
import { Request, Response, NextFunction } from "express"
import * as GalleriesService from "./galleries.service"
import {
	IBaseGallery,
	IGallery,
	IBaseGalleryColor,
	IGalleryColor,
} from "../interfaces/objects.interface"
import { errorHandler } from "../middleware/error.handlers"

// Functions
export const isValidGallery = (req: Request, res: Response, next: NextFunction) => {
	// Get gallery from create/update req
	const gallery: IBaseGallery = req.body
	// Build error message
	let message: string = ""
	if (!gallery.user_id) message += "User ID required. "
	if (!gallery.gallery_name) message += "Gallery name required."
	// Return err or pass thru locals
	if (message !== "") {
		errorHandler({ status: 400, message }, res)
	} else {
		res.locals.validGallery = gallery
		return next()
	}
}

export const isValidGalleryColor = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get gallery_url from create/update req
	const galleryColor: IBaseGalleryColor = req.body
	// Build error message
	let message: string = ""
	if (!galleryColor.gallery_id) message += "Gallery ID required. "
	if (!galleryColor.value) message += "Color required. "
	// Return err or pass thru locals
	if (message !== "") {
		errorHandler({ status: 400, message }, res)
	} else {
		res.locals.validGalleryColor = galleryColor
		return next()
	}
}

export const galleryExists = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get ID from param or req body
	let id: string = ""
	if (req.params.gallery_id) {
		id = req.params.gallery_id
	} else if (req.body.data.gallery_id) {
		id = req.body.data.gallery_id
	} else {
		errorHandler({ status: 400, message: "Gallery ID required." }, res)
	}
	// Read the gallery
	const gallery: IGallery = await GalleriesService.read(parseInt(id))
	// Return if found
	if (gallery) {
		res.locals.foundGallery = gallery
		return next()
	}
	errorHandler(
		{ status: 404, message: `Gallery ${id} cannot be found.` },
		res,
	)
}

export const galleryColorExists = async (
	req: Request,
	res: Response,
	next: NextFunction,
	id: string = "",
) => {
	// Get ID from req params
	if (req.params.gallery_color_id) {
		id = req.params.gallery_color_id
	} else {
		errorHandler(
			{ status: 400, message: "Gallery Color ID required." },
			res,
		)
	}
	// Read the gallery color
	const galleryColor: IGalleryColor = await GalleriesService.readColor(
		parseInt(id),
	)
	// Return if found
	if (galleryColor) {
		res.locals.foundGalleryColor = galleryColor
		return next()
	}
	errorHandler(
		{ status: 404, message: `GalleryColor ${id} cannot be found.` },
		res,
	)
}

export const appendData = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get gallery from locals
	const gallery: IGallery = res.locals.validGallery
	// Add created date if none provided
	if (!gallery.created_at) {
		gallery.created_at = new Date()
	}
	// Append updated date
	gallery.updated_at = new Date()
	// Pass thru completed object
	res.locals.validGallery = gallery
	return next()
}

export const appendChildren = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	// Get gallery from locals
	const gallery: IGallery = res.locals.foundGallery
	// Add colors and videos
	const id: number = gallery.gallery_id
	gallery.colors = await GalleriesService.listColors(id)
	gallery.videos = await GalleriesService.listVideos(id)
	// Pass thru completed object
	res.locals.validGallery = gallery
	return next()
}

export const appendChildrenToList = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	res.locals.validGalleries = new Array()
	const galleries: IGallery[] = res.locals.foundGalleries
	galleries.forEach(async (gallery: IGallery, index: number) => {
		gallery.colors = await GalleriesService.listColors(gallery.gallery_id)
		gallery.videos = await GalleriesService.listVideos(gallery.gallery_id)
		res.locals.validGalleries.push(gallery)
		console.log("Locals: ", res.locals.validGalleries)
	})
	return next()
}