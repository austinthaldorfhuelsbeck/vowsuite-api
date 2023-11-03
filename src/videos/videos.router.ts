// External Modules
import express from "express"
import { VideosController } from "./videos.controller"
import { methodNotAllowed } from "../middleware/error.handlers"

// Routers
export const videosRouter = express.Router()

// Routes
videosRouter.route("/").post(VideosController.create).all(methodNotAllowed)
videosRouter
	.route("/:video_id")
	.get(VideosController.read)
	.put(VideosController.update)
	.delete(VideosController.delete)
	.all(methodNotAllowed)
