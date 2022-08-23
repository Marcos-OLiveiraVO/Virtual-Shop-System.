import express from "express";
import router from "./routes";
import database from "./database";

const app = express();

const configureExpress = () => {
  app.use(express.json());
  app.use("/", router);
  app.database = database;

  return app;
};

export default async () => {
  const app = configureExpress();
  await app.database.connect();

  return app;
};
