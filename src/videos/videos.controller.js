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
exports.VideosController = void 0;
const VideosValidation = __importStar(require("./videos.validation"));
const VideosService = __importStar(require("./videos.service"));
const error_handlers_1 = require("../middleware/error.handlers");
/**
 * Controller Definitions
 */
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = res.locals.validVideo;
        video.video_id = new Date().valueOf(); // add video ID
        const newVideo = yield VideosService.create(video);
        res.status(201).json(newVideo);
    }
    catch (err) {
        (0, error_handlers_1.errorHandler)(err, res);
    }
});
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(res.locals.foundVideo);
    }
    catch (err) {
        (0, error_handlers_1.errorHandler)(err, res);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedVideo = res.locals.validVideo;
        const id = parseInt(res.locals.foundVideo.video_id);
        const responseVideo = yield VideosService.update(updatedVideo, id);
        res.json(responseVideo);
    }
    catch (err) {
        (0, error_handlers_1.errorHandler)(err, res);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(res.locals.foundVideo.video_id);
        const response = yield VideosService.destroy(id);
        res.json(response);
    }
    catch (err) {
        (0, error_handlers_1.errorHandler)(err, res);
    }
});
/**
 * Exports
 */
exports.VideosController = {
    create: [
        VideosValidation.isValidVideo,
        VideosValidation.appendData,
        create
    ],
    read: [VideosValidation.videoExists, read],
    update: [VideosValidation.videoExists,
        VideosValidation.isValidVideo,
        update
    ],
    delete: [VideosValidation.videoExists, destroy]
};
