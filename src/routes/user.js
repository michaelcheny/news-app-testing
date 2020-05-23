import "dotenv/config";
import { Router } from "express";
import User from "../models/user";
import Article from "../models/article";
import bcrpyt from "bcrypt";
import passport from "passport";
const passportConfig = require("../../passport");
const JWT = require("jsonwebtoken");

const router = Router();

// helper
const signToken = (userId) => {
  return JWT.sign(
    {
      iss: process.env.JWT_SECRET,
      sub: userId,
    },
    // JWT SECRET KEY
    process.env.JWT_SECRET,
    // jwt expiration
    { expiresIn: "1h" }
  );
};

// login
router.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    const { _id, username, role } = req.user;
    const token = signToken(_id);
    // httpOnly prevents against JS scripting, sameSite for CORS
    res.cookie("access_token", token, { httpOnly: true, sameSite: true });

    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
});

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
  return res.send(req.params.id);
});

// create one
router.post("/", (req, res) => {
  const { username, password, role } = req.body;
  User.findOne({ username }, (error, user) => {
    if (error)
      return res
        .status(500)
        .json({ message: { msgBody: "Error occured", msgError: true } });
    if (user)
      return res
        .status(400)
        .json({ message: { msgBody: "Username is already taken", msgError: true } });

    const newUser = new User({ username, password, role });
    newUser.save((error) => {
      if (error) {
        return res
          .status(500)
          .json({ message: { msgBody: "Error occured", msgError: true } });
      } else {
        return res.status(201).json({
          message: { msgBody: "Account created successfully", msgError: false },
        });
      }
    });
  });
});

// update
router.patch("/:id", (req, res) => {});

// delete
router.delete("/:id", (req, res) => {});

export default router;
