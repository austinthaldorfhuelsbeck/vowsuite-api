/**
 * Required External Modules and Interfaces
 */

import express from "express"
import { UsersController } from "./users.controller"
import { methodNotAllowed } from "../middleware/error.handlers"

/**
 * Router Definition
 */

export const usersRouter = express.Router()

/**
 * Route Definitions
 */

usersRouter
    .route("/")
    .get(UsersController.readByEmail)
    .post(UsersController.create)
    .all(methodNotAllowed)
usersRouter
    .route("/:user_id")
    .get(UsersController.read)
    .put(UsersController.update)
    .delete(UsersController.delete)
    .all(methodNotAllowed)
usersRouter
    .route("/:user_id/galleries")
    .get(UsersController.listGalleries)
    .all(methodNotAllowed)