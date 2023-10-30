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
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.createTable("companies", (table) => {
            table.bigInteger("company_id").primary();
            table.bigInteger("user_id");
            table.string("company_name");
            table.string("img_URL");
            table.string("website_URL").defaultTo("");
            table.string("youtube_URL").defaultTo("");
            table.string("instagram_URL").defaultTo("");
            table.string("facebook_URL").defaultTo("");
            table.string("vimeo_URL").defaultTo("");
            table.string("tiktok_URL").defaultTo("");
            table.timestamps(true, true);
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable("companies");
    });
}
exports.down = down;
