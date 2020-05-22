import { Router } from "express";
import User from "../models/user";
import bcrpyt from "bcrypt";

const router = Router();

// all
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// one
router.get("/:userId", (req, res) => {
  res.send(req.params.id);
});

// create one
router.post("/", async (req, res) => {
  try {
    const salt = await bcrpyt.genSalt();
    const hashedPassword = await bcrpyt.hash(req.body.password, salt);
    console.log(salt);
    console.log(hashedPassword);
    const user = {
      username: req.body.username,
      password: hashedPassword,
    };
  } catch (err) {}
});

// update
router.patch("/:id", (req, res) => {});

// delete
router.delete("/:id", (req, res) => {});

export default router;
