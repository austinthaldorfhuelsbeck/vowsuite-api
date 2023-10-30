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
exports.appendData = exports.companyExists = exports.isValidCompany = void 0;
const CompaniesService = __importStar(require("./companies.service"));
const error_handlers_1 = require("../middleware/error.handlers");
/**
 * Middleware Definitions
 */
const isValidCompany = (req, res, next) => {
    // Get company from create/update req
    const company = req.body;
    // Build error message
    let message = "";
    if (!company.user_id)
        message += "User ID required. ";
    if (!company.company_name)
        message += "Company name required.";
    // Return err or pass thru locals
    if (message !== "") {
        (0, error_handlers_1.errorHandler)({ status: 400, message }, res);
    }
    else {
        res.locals.validCompany = company;
        return next();
    }
};
exports.isValidCompany = isValidCompany;
const companyExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get ID from param or req body
    let id = "";
    if (req.params.company_id) {
        id = req.params.company_id;
    }
    else if (req.body.data.company_id) {
        id = req.body.data.company_id;
    }
    else {
        (0, error_handlers_1.errorHandler)({ status: 400, message: "Company ID required." }, res);
    }
    // Read the company
    const company = yield CompaniesService.read(parseInt(id));
    // Return if found
    if (company) {
        res.locals.foundCompany = company;
        return next();
    }
    (0, error_handlers_1.errorHandler)({ status: 404, message: `Company ${id} cannot be found.` }, res);
});
exports.companyExists = companyExists;
const appendData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get company from locals
    const company = res.locals.validCompany;
    // Append placeholder img URL if none provided
    if (!company.img_URL) {
        company.img_URL = "https://i.stack.imgur.com/HQwHI.jpg";
    }
    // Append hex data if none provided
    // if (!company.hex1) {
    //     company.hex1 = "c39a32"
    // }
    // if (!company.hex2) {
    //     company.hex2 = "f3efe0"
    // }
    // if (!company.hex3) {
    //     company.hex3 = "d9bb6d"
    // }
    // Append created date if none provided
    if (!company.created_at) {
        company.created_at = new Date();
    }
    // Append updated date
    company.updated_at = new Date();
    // Pass thru completed object
    res.locals.validCompany = company;
    return next();
});
exports.appendData = appendData;
