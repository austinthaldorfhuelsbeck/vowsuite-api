/**
 * Required External Modules and Interfaces
 */

import express from "express"
import { VideosController } from "./videos.controller"
import { methodNotAllowed } from "../middleware/error.handlers"

/**
 * Router Definition
 */

export const videosRouter = express.Router()

/**
 * Route Definitions
 */

videosRouter
    .route("/")
    .post(VideosController.create)
    .all(methodNotAllowed)
videosRouter
    .route("/:video_id")
    .get(VideosController.read)
    .put(VideosController.update)
    .delete(VideosController.delete)
    .all(methodNotAllowed)