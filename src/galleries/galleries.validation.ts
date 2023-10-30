/**
 * Required External Modules and Interfaces
 */
import { Request, Response, NextFunction } from "express"
import * as GalleriesService from "./galleries.service"
import { IBaseGallery, IGallery } from "../interfaces/objects.interface"
import { errorHandler } from "../middleware/error.handlers";

/**
 * Middleware Definitions
 */
export const isValidGallery = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
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

export const galleryExists = async (
    req: Request,
    res: Response,
    next: NextFunction
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
    errorHandler({ status: 404, message: `Gallery ${id} cannot be found.` }, res)
}

export const appendData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Get gallery from locals
    const gallery: IGallery = res.locals.validGallery
    // Append placeholder img URL if none provided
    if (!gallery.img_URL) {
        gallery.img_URL = "https://i.stack.imgur.com/HQwHI.jpg"
    }
    // Append hex data from company if incomplete
    if (!gallery.hex1 || !gallery.hex2 || !gallery.hex3) {
        gallery.hex1 = "000000"
        gallery.hex2 = "000000"
        gallery.hex3 = "000000"
    }
    // Append created date if none provided
    if (!gallery.created_at) {
        gallery.created_at = new Date()
    }
    // Append updated date
    gallery.updated_at = new Date()
    // Pass thru completed object
    res.locals.validGallery = gallery
    return next()
}