"use strict";
/**
 * Required External Modules
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const nocache_1 = __importDefault(require("nocache"));
const users_router_1 = require("./users/users.router");
const companies_router_1 = require("./companies/companies.router");
const galleries_router_1 = require("./galleries/galleries.router");
const videos_router_1 = require("./videos/videos.router");
const ErrorHandlers = __importStar(require("./middleware/error.handlers"));
// import { validateAccessToken } from "./middleware/auth0.middleware";
/**
 * App Definition
 */
exports.app = (0, express_1.default)();
// const CLIENT_ORIGIN_URL: string | undefined = process.env.CLIENT_ORIGIN_URL;
/**
 * Middleware and Handlers
 */
// Middleware
exports.app.use(express_1.default.json());
exports.app.set("json spaces", 2);
exports.app.use((req, res, next) => {
    res.contentType("application/json; charset=utf-8");
    next();
});
exports.app.use((0, nocache_1.default)());
exports.app.use((0, cors_1.default)());
// app.use("*", validateAccessToken)
// Route handlers
exports.app.use("/users", users_router_1.usersRouter);
exports.app.use("/companies", companies_router_1.companiesRouter);
exports.app.use("/galleries", galleries_router_1.galleriesRouter);
exports.app.use("/videos", videos_router_1.videosRouter);
//Error handlers
exports.app.use(ErrorHandlers.notFound);
exports.app.use(ErrorHandlers.errorHandler);
