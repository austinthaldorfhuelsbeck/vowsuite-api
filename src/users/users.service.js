"use strict";
/**
 * Data Model Interfaces
 */
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
exports.listGalleriesByUserID = exports.readCompanyByUserID = exports.readUserByEmail = exports.destroy = exports.update = exports.read = exports.create = void 0;
/**
 * Knex object for database connection
 */
const connection_1 = __importDefault(require("../db/connection"));
const create = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, connection_1.default)("users")
        .insert(newUser)
        .returning("*")
        .then((createdUsers) => createdUsers[0]);
});
exports.create = create;
const read = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, connection_1.default)("users")
        .select("*")
        .where({ user_id: id })
        .then((foundUsers) => foundUsers[0]);
});
exports.read = read;
const update = (updatedUser, id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, connection_1.default)("users")
        .select("*")
        .where({ user_id: id })
        .update(updatedUser, "*")
        .then((updatedUsers) => updatedUsers[0]);
});
exports.update = update;
const destroy = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, connection_1.default)("users").where({ user_id: id }).del();
});
exports.destroy = destroy;
const readUserByEmail = (user_email) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, connection_1.default)("users")
        .select("*")
        .where({ email: user_email })
        .then((foundUsers) => foundUsers[0]);
});
exports.readUserByEmail = readUserByEmail;
const readCompanyByUserID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, connection_1.default)("users as u")
        .join("companies as c", "u.user_id", "c.user_id")
        .distinct("c.*")
        .where({ "c.user_id": id })
        .then((foundCompanies) => foundCompanies[0]);
});
exports.readCompanyByUserID = readCompanyByUserID;
const listGalleriesByUserID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, connection_1.default)("users as u")
        .join("galleries as g", "u.user_id", "g.user_id")
        .distinct("g.*")
        .where({ "g.user_id": id });
});
exports.listGalleriesByUserID = listGalleriesByUserID;
