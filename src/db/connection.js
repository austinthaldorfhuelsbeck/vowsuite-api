"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../../knexfile"));
// environment defaults to dev if none specified
let environment = "development";
if (process.env.NODE_ENV)
    environment = process.env.NODE_ENV;
const knex = (0, knex_1.default)(knexfile_1.default[environment]);
exports.default = knex;
