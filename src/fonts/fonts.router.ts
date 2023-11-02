/**
 * Required External Modules and Interfaces
 */

import express from "express"
import { FontsController } from "./fonts.controller"
import { methodNotAllowed } from "../middleware/error.handlers"

/**
 * Router Definition
 */

export const fontsRouter = express.Router()

/**
 * Route Definitions
 */

fontsRouter
    .route("/")
    .post(FontsController.create)
    .all(methodNotAllowed)
fontsRouter
    .route("/:font_id")
    .get(FontsController.read)
    .put(FontsController.update)
    .delete(FontsController.delete)
    .all(methodNotAllowed)