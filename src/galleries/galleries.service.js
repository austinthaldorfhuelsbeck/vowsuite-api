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
exports.listVideosByGalleryID = exports.destroy = exports.update = exports.read = exports.create = void 0;
/**
 * Knex object for database connection
 */
const connection_1 = __importDefault(require("../db/connection"));
const create = (newGallery) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, connection_1.default)("galleries")
        .insert(newGallery)
        .returning("*")
        .then((createdGalleries) => createdGalleries[0]);
});
exports.create = create;
const read = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, connection_1.default)("galleries")
        .select("*")
        .where({ gallery_id: id })
        .then((foundGalleries) => foundGalleries[0]);
});
exports.read = read;
const update = (updatedGallery, id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, connection_1.default)("galleries")
        .select("*")
        .where({ gallery_id: id })
        .update(updatedGallery, "*")
        .then((updatedGalleries) => updatedGalleries[0]);
});
exports.update = update;
const destroy = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, connection_1.default)("galleries").where({ gallery_id: id }).del();
});
exports.destroy = destroy;
const listVideosByGalleryID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, connection_1.default)("galleries as g")
        .join("videos as v", "g.gallery_id", "v.gallery_id")
        .distinct("v.*")
        .where({ "v.gallery_id": id });
});
exports.listVideosByGalleryID = listVideosByGalleryID;
