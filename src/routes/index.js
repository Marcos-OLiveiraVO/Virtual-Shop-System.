import express from "express";
import productsRoute from "./products";
import usersRoute from "./users";

const router = express.Router();

router.use(express.json());
router.use("/products", productsRoute);
router.uses("users", usersRoute);

router.get("/", (req, res) => {
  res.send("Hello World");
});

export default router;
