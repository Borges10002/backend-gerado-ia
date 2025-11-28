//create a sqlite database connection using typeorm
import { DataSource } from "typeorm";

const databaseService = new DataSource({
  type: "sqlite",
  database: "src/infratructure/db/database.sqlite",
  synchronize: true,
  logging: false,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/infratructure/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
});

export default databaseService;
