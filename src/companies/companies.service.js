"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.update = exports.read = exports.create = void 0;
/**
 * Knex object for database connection
 */
const connection_1 = __importDefault(require("../db/connection"));
const create = (newCompany) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, connection_1.default)("companies")
        .insert(newCompany)
        .returning("*")
        .then((createdCompanies) => createdCompanies[0]);
});
exports.create = create;
const read = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, connection_1.default)("companies")
        .select("*")
        .where({ company_id: id })
        .then((foundCompanies) => foundCompanies[0]);
});
exports.read = read;
const update = (updatedCompany, id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, connection_1.default)("companies")
        .select("*")
        .where({ company_id: id })
        .update(updatedCompany, "*")
        .then((updatedCompanies) => updatedCompanies[0]);
});
exports.update = update;
const destroy = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, connection_1.default)("companies").where({ company_id: id }).del();
});
exports.destroy = destroy;
