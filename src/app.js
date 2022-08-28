import express from "express";
import router from "./routes";
import database from "./database";
import acl from "express-acl";

const app = express();

acl.config({
  baseUrl: "/",
  path: "config",
});

const configureExpress = () => {
  app.use(express.json());
  app.use(acl.authorize.unless({ path: ["/users/authenticate"] }));
  app.use("/", router);
  app.database = database;

  return app;
};

export default async () => {
  const app = configureExpress();
  await app.database.connect();

  return app;
};
