// External Modules
import express from "express"
import { FontsController } from "./fonts.controller"
import { methodNotAllowed } from "../middleware/error.handlers"

// Routers
export const fontsRouter = express.Router()

// Routes
fontsRouter
	.route("/")
	.get(FontsController.list)
	.post(FontsController.create)
	.all(methodNotAllowed)
fontsRouter
	.route("/:font_id")
	.get(FontsController.read)
	.put(FontsController.update)
	.delete(FontsController.delete)
	.all(methodNotAllowed)
