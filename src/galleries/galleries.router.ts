/**
 * Required External Modules and Interfaces
 */
import express from "express"
import { GalleriesController } from "./galleries.controller"
import { methodNotAllowed } from "../middleware/error.handlers"

/**
 * Router Definition
 */
export const galleriesRouter = express.Router()

/**
 * Route Definitions
 */
galleriesRouter
    .route("/")
    .post(GalleriesController.create)
    .all(methodNotAllowed)
galleriesRouter
    .route("/:gallery_id")
    .get(GalleriesController.read)
    .put(GalleriesController.update)
    .delete(GalleriesController.delete)
    .all(methodNotAllowed)
galleriesRouter
    .route("/:gallery_id/videos")
    .get(GalleriesController.listVideosByGalleryID)
    .all(methodNotAllowed)