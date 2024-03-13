import path from "path";
import { DataSource } from "typeorm";

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
const javascriptEntitiesPath = path.join(__dirname, 'entity', '*.entity.js');

// For TypeScript Entities
const typescriptEntitiesPath = path.join(__dirname, 'entity', '*.entity.ts');

// For Both JavaScript and TypeScript Entities
const entitiesPath = [javascriptEntitiesPath];

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "password",
  // password: "password",
  // database: "ludo_game",
  database: "ludo_game",
//  entities: ["src/entity/{*.ts, *.js}"],
  entities: ["dist/entity/{*.ts, *.js}"],
  // entities: ["entity/*.entity.{ts,js}"],
  logging: true,
  synchronize: true,
});

export default AppDataSource;