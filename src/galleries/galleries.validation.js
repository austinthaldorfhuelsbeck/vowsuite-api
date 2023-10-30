"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendData = exports.galleryExists = exports.isValidGallery = void 0;
const GalleriesService = __importStar(require("./galleries.service"));
const error_handlers_1 = require("../middleware/error.handlers");
/**
 * Middleware Definitions
 */
const isValidGallery = (req, res, next) => {
    // Get gallery from create/update req
    const gallery = req.body;
    // Build error message
    let message = "";
    if (!gallery.user_id)
        message += "User ID required. ";
    if (!gallery.gallery_name)
        message += "Gallery name required.";
    // Return err or pass thru locals
    if (message !== "") {
        (0, error_handlers_1.errorHandler)({ status: 400, message }, res);
    }
    else {
        res.locals.validGallery = gallery;
        return next();
    }
};
exports.isValidGallery = isValidGallery;
const galleryExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get ID from param or req body
    let id = "";
    if (req.params.gallery_id) {
        id = req.params.gallery_id;
    }
    else if (req.body.data.gallery_id) {
        id = req.body.data.gallery_id;
    }
    else {
        (0, error_handlers_1.errorHandler)({ status: 400, message: "Gallery ID required." }, res);
    }
    // Read the gallery
    const gallery = yield GalleriesService.read(parseInt(id));
    // Return if found
    if (gallery) {
        res.locals.foundGallery = gallery;
        return next();
    }
    (0, error_handlers_1.errorHandler)({ status: 404, message: `Gallery ${id} cannot be found.` }, res);
});
exports.galleryExists = galleryExists;
const appendData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get gallery from locals
    const gallery = res.locals.validGallery;
    // Append placeholder img URL if none provided
    if (!gallery.img_URL) {
        gallery.img_URL = "https://i.stack.imgur.com/HQwHI.jpg";
    }
    // Append hex data from company if incomplete
    if (!gallery.hex1 || !gallery.hex2 || !gallery.hex3) {
        gallery.hex1 = "000000";
        gallery.hex2 = "000000";
        gallery.hex3 = "000000";
    }
    // Append created date if none provided
    if (!gallery.created_at) {
        gallery.created_at = new Date();
    }
    // Append updated date
    gallery.updated_at = new Date();
    // Pass thru completed object
    res.locals.validGallery = gallery;
    return next();
});
exports.appendData = appendData;
