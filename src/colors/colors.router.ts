/**
 * Required External Modules and Interfaces
 */

import express from "express"
import { ColorsController } from "./colors.controller"
import { methodNotAllowed } from "../middleware/error.handlers"

/**
 * Router Definition
 */

export const colorsRouter = express.Router()

/**
 * Route Definitions
 */

colorsRouter
    .route("/")
    .post(ColorsController.create)
    .all(methodNotAllowed)
colorsRouter
    .route("/:color_id")
    .get(ColorsController.read)
    .put(ColorsController.update)
    .delete(ColorsController.delete)
    .all(methodNotAllowed)