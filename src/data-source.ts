import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "ludo_game",
  entities: ["src/entity/{*.ts, *.js}"],
//   entities: ["dist/entity/*.entity.js"],
  // entities: ["entity/*.entity.{ts,js}"],
  logging: true,
  synchronize: false,
});

export default AppDataSource;