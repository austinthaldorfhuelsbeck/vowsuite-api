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
exports.appendData = exports.userExists = exports.isValidUser = void 0;
const UsersService = __importStar(require("./users.service"));
const error_handlers_1 = require("../middleware/error.handlers");
/**
 * Middleware Definitions
 */
const isValidUser = (req, res, next) => {
    // Get user from create/update req
    const user = req.body;
    // Build error message
    let message = "";
    if (!user.user_name)
        message += "User name required. ";
    if (!user.email)
        message += "Email required.";
    // Return err or pass thru locals
    if (message !== "") {
        (0, error_handlers_1.errorHandler)({ status: 400, message }, res);
    }
    else {
        res.locals.validUser = user;
        return next();
    }
};
exports.isValidUser = isValidUser;
const userExists = (req, res, next, id = "") => __awaiter(void 0, void 0, void 0, function* () {
    // Get ID from param or req body if it
    // didn't come in from query/params
    if (req.params.user_id) {
        id = req.params.user_id;
    }
    else if (req.body.data.user_id) {
        id = req.body.data.user_id;
    }
    else {
        (0, error_handlers_1.errorHandler)({ status: 400, message: "User ID required." }, res);
    }
    ;
    // Read the user
    const user = yield UsersService.read(parseInt(id));
    // Return if found
    if (user) {
        res.locals.foundUser = user;
        return next();
    }
    ;
    (0, error_handlers_1.errorHandler)({ status: 404, message: `User ${id} cannot be found.` }, res);
});
exports.userExists = userExists;
const appendData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get user from locals
    const user = res.locals.validUser;
    // Append created date if none provided
    if (!user.created_at) {
        user.created_at = new Date();
    }
    // Append updated date
    user.updated_at = new Date();
    // Pass thru completed object
    res.locals.validUser = user;
    return next();
});
exports.appendData = appendData;
