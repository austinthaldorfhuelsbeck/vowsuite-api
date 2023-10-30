"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.galleriesRouter = void 0;
/**
 * Required External Modules and Interfaces
 */
const express_1 = __importDefault(require("express"));
const galleries_controller_1 = require("./galleries.controller");
const error_handlers_1 = require("../middleware/error.handlers");
/**
 * Router Definition
 */
exports.galleriesRouter = express_1.default.Router();
/**
 * Route Definitions
 */
exports.galleriesRouter
    .route("/")
    .post(galleries_controller_1.GalleriesController.create)
    .all(error_handlers_1.methodNotAllowed);
exports.galleriesRouter
    .route("/:gallery_id")
    .get(galleries_controller_1.GalleriesController.read)
    .put(galleries_controller_1.GalleriesController.update)
    .delete(galleries_controller_1.GalleriesController.delete)
    .all(error_handlers_1.methodNotAllowed);
exports.galleriesRouter
    .route("/:gallery_id/videos")
    .get(galleries_controller_1.GalleriesController.listVideosByGalleryID)
    .all(error_handlers_1.methodNotAllowed);
