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
exports.UsersController = void 0;
const UsersValidation = __importStar(require("./users.validation"));
const UsersService = __importStar(require("./users.service"));
const GalleriesService = __importStar(require("../galleries/galleries.service"));
const error_handlers_1 = require("../middleware/error.handlers");
/**
 * Controller Definitions
 */
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = res.locals.validUser;
        user.user_id = new Date().valueOf(); // add user ID
        const newUser = yield UsersService.create(user);
        res.status(201).json(newUser);
    }
    catch (err) {
        (0, error_handlers_1.errorHandler)(err, res);
    }
});
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseUser = res.locals.foundUser;
        const id = responseUser.user_id;
        responseUser.company = yield UsersService.readCompanyByUserID(id);
        responseUser.galleries = yield UsersService.listGalleriesByUserID(id);
        for (let i = 0; i < responseUser.galleries.length; i++) {
            responseUser.galleries[i].videos =
                yield GalleriesService.listVideosByGalleryID(responseUser.galleries[i].gallery_id);
        }
        res.json(responseUser);
    }
    catch (err) {
        (0, error_handlers_1.errorHandler)(err, res);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = res.locals.validUser;
        const id = parseInt(res.locals.foundUser.user_id);
        const responseUser = yield UsersService.update(updatedUser, id);
        res.json(responseUser);
    }
    catch (err) {
        (0, error_handlers_1.errorHandler)(err, res);
    }
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(res.locals.foundUser.user_id);
        const response = yield UsersService.destroy(id);
        res.json(response);
    }
    catch (err) {
        (0, error_handlers_1.errorHandler)(err, res);
    }
});
const readUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_email = String(req.query.email);
        const responseUser = yield UsersService.readUserByEmail(user_email);
        const id = responseUser.user_id;
        responseUser.company = yield UsersService.readCompanyByUserID(id);
        responseUser.galleries = yield UsersService.listGalleriesByUserID(id);
        for (let i = 0; i < responseUser.galleries.length; i++) {
            responseUser.galleries[i].videos =
                yield GalleriesService.listVideosByGalleryID(responseUser.galleries[i].gallery_id);
        }
        res.json(responseUser);
    }
    catch (err) {
        (0, error_handlers_1.errorHandler)(err, res);
    }
});
const readCompanyByUserID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = res.locals.foundUser.user_id;
        const responseCompany = yield UsersService.readCompanyByUserID(id);
        res.json(responseCompany);
    }
    catch (err) {
        (0, error_handlers_1.errorHandler)(err, res);
    }
});
const listGalleriesByUserID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = res.locals.foundUser.user_id;
        const responseGalleries = yield UsersService.listGalleriesByUserID(id);
        for (let i = 0; i < responseGalleries.length; i++) {
            responseGalleries[i].videos =
                yield GalleriesService.listVideosByGalleryID(responseGalleries[i].gallery_id);
        }
        res.json(responseGalleries);
    }
    catch (err) {
        (0, error_handlers_1.errorHandler)(err, res);
    }
});
/**
 * Exports
 */
exports.UsersController = {
    create: [
        UsersValidation.isValidUser,
        UsersValidation.appendData,
        create
    ],
    read: [UsersValidation.userExists, read],
    update: [UsersValidation.userExists,
        UsersValidation.isValidUser,
        update
    ],
    delete: [UsersValidation.userExists, destroy],
    readUserByEmail: [readUserByEmail],
    readCompanyByUserID: [UsersValidation.userExists, readCompanyByUserID],
    listGalleriesByUserID: [UsersValidation.userExists, listGalleriesByUserID]
};
