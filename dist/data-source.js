"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("typeorm");
// export const AppDataSource = new DataSource({
//   type: "mysql",
//   host: "localhost",
//   port: 3306,
//   username: "root",
//   // password: "password",
//   password: "",
//   // database: "ludo_game",
//   database: "ludo_game",
//   entities: ["src/entity/{*.ts, *.js}"],
//   // entities: ["dist/entity/*.entity.js"],
//   // entities: ["entity/*.entity.{ts,js}"],
//   logging: true,
//   synchronize: true,
// });
// const path = require('path');
// For JavaScript Entities
const javascriptEntitiesPath = path_1.default.join(__dirname, 'entity', '*.entity.js');
// For TypeScript Entities
const typescriptEntitiesPath = path_1.default.join(__dirname, 'entity', '*.entity.ts');
// For Both JavaScript and TypeScript Entities
const entitiesPath = [typescriptEntitiesPath];
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "password",
    // password: "password",
    // database: "ludo_game",
    database: "ludo_game",
    //  entities: ["src/entity/{*.ts, *.js}"],
    entities: entitiesPath,
    // entities: ["entity/*.entity.{ts,js}"],
    logging: true,
    synchronize: true,
});
exports.default = exports.AppDataSource;
