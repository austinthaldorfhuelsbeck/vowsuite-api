"use strict";
/**
 * Required External Modules and Interfaces
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = __importDefault(require("express"));
const videos_controller_1 = require("./videos.controller");
const error_handlers_1 = require("../middleware/error.handlers");
/**
 * Router Definition
 */
exports.videosRouter = express_1.default.Router();
/**
 * Route Definitions
 */
exports.videosRouter
    .route("/")
    .post(videos_controller_1.VideosController.create)
    .all(error_handlers_1.methodNotAllowed);
exports.videosRouter
    .route("/:video_id")
    .get(videos_controller_1.VideosController.read)
    .put(videos_controller_1.VideosController.update)
    .delete(videos_controller_1.VideosController.delete)
    .all(error_handlers_1.methodNotAllowed);
