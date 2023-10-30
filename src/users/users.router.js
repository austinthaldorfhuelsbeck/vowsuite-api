"use strict";
/**
 * Required External Modules and Interfaces
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const error_handlers_1 = require("../middleware/error.handlers");
/**
 * Router Definition
 */
exports.usersRouter = express_1.default.Router();
/**
 * Route Definitions
 */
exports.usersRouter
    .route("/")
    .get(users_controller_1.UsersController.readUserByEmail)
    .post(users_controller_1.UsersController.create)
    .all(error_handlers_1.methodNotAllowed);
exports.usersRouter
    .route("/:user_id")
    .get(users_controller_1.UsersController.read)
    .put(users_controller_1.UsersController.update)
    .delete(users_controller_1.UsersController.delete)
    .all(error_handlers_1.methodNotAllowed);
exports.usersRouter
    .route("/:user_id/galleries")
    .get(users_controller_1.UsersController.listGalleriesByUserID)
    .all(error_handlers_1.methodNotAllowed);
