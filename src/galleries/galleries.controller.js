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
exports.GalleriesController = void 0;
const GalleriesValidation = __importStar(require("./galleries.validation"));
const GalleriesService = __importStar(require("./galleries.service"));
const error_handlers_1 = require("../middleware/error.handlers");
/**
 * Controller Definitions
 */
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gallery = res.locals.validGallery;
        gallery.gallery_id = new Date().valueOf(); // add gallery ID
        const newGallery = yield GalleriesService.create(gallery);
        res.status(201).json(newGallery);
    }
    catch (err) {
        (0, error_handlers_1.errorHandler)(err, res);
    }
});
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gallery = res.locals.foundGallery;
        const id = gallery.gallery_id;
        gallery.videos = yield GalleriesService.listVideosByGalleryID(id);
        res.json(gallery);
    }
    catch (err) {
        (0, error_handlers_1.errorHandler)(err, res);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedGallery = res.locals.validGallery;
        const id = parseInt(res.locals.foundGallery.gallery_id);
        const responseGallery = yield GalleriesService.update(updatedGallery, id);
        res.json(responseGallery);
    }
    catch (err) {
        (0, error_handlers_1.errorHandler)(err, res);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(res.locals.foundGallery.gallery_id);
        const response = yield GalleriesService.destroy(id);
        res.json(response);
    }
    catch (err) {
        (0, error_handlers_1.errorHandler)(err, res);
    }
});
const listVideosByGalleryID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = res.locals.foundGallery.gallery_id;
        const responseVideos = yield GalleriesService.listVideosByGalleryID(id);
        res.json(responseVideos);
    }
    catch (err) {
        (0, error_handlers_1.errorHandler)(err, res);
    }
});
/**
 * Exports
 */
exports.GalleriesController = {
    create: [
        GalleriesValidation.isValidGallery,
        GalleriesValidation.appendData,
        create
    ],
    read: [GalleriesValidation.galleryExists, read],
    update: [GalleriesValidation.galleryExists,
        GalleriesValidation.isValidGallery,
        update
    ],
    delete: [GalleriesValidation.galleryExists, destroy],
    listVideosByGalleryID: [GalleriesValidation.galleryExists, listVideosByGalleryID],
};
