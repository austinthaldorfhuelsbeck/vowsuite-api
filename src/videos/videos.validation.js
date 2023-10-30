"use strict";
/**
 * Required External Modules and Interfaces
 */
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
exports.appendData = exports.videoExists = exports.isValidVideo = void 0;
const VideosService = __importStar(require("./videos.service"));
const error_handlers_1 = require("../middleware/error.handlers");
/**
 * Middleware Definitions
 */
const isValidVideo = (req, res, next) => {
    // Get video from create/update req
    const video = req.body;
    // Build error message
    let message = "";
    if (!video.gallery_id)
        message += "Gallery ID required. ";
    if (!video.video_URL)
        message += "Video URL required. ";
    if (!video.video_name)
        message += "Video name required.";
    // Return err or pass thru locals
    if (message !== "") {
        (0, error_handlers_1.errorHandler)({ status: 400, message }, res);
    }
    else {
        res.locals.validVideo = video;
        return next();
    }
};
exports.isValidVideo = isValidVideo;
const videoExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get ID from param or req body
    let id = "";
    if (req.params.video_id) {
        id = req.params.video_id;
    }
    else if (req.body.data.video_id) {
        id = req.body.data.video_id;
    }
    else {
        (0, error_handlers_1.errorHandler)({ status: 400, message: "Video ID required." }, res);
    }
    // Read the video
    const video = yield VideosService.read(parseInt(id));
    // Return if found
    if (video) {
        res.locals.foundVideo = video;
        return next();
    }
    (0, error_handlers_1.errorHandler)({ status: 404, message: `Video ${id} cannot be found.` }, res);
});
exports.videoExists = videoExists;
const appendData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get video from locals
    const video = res.locals.validVideo;
    // Append placeholder img URL if none provided
    if (!video.img_URL) {
        video.img_URL = "https://i.stack.imgur.com/HQwHI.jpg";
    }
    // Append created date if none provided
    if (!video.created_at) {
        video.created_at = new Date();
    }
    // Append updated date
    video.updated_at = new Date();
    // Pass thru completed object
    res.locals.validVideo = video;
    return next();
});
exports.appendData = appendData;
