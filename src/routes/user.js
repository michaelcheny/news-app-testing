import { Router } from "express";
import User from "../models/user";
import Article from "../models/article";
import bcrpyt from "bcrypt";
import passport from "passport";
const passportConfig = require("../../passport");
const JWT = require("jsonwebtoken");

const router = Router();

// registration
// router.post("/register", (req, res) => {
//   const { username, password, role } = req.body;
//   User.findOne({ username }, (error, user) => {
//     if (error)
//       res.status(500).json({ message: { msgBody: "Error occured", msgError: true } });
//     if (user)
//       res
//         .status(400)
//         .json({ message: { msgBody: "Username is already taken", msgError: true } });

//     const newUser = newUser({ username, password, role });
//     newUser.save((error) => {
//       if (error) {
//         res.status(500).json({ message: { msgBody: "Error occured", msgError: true } });
//       } else {
//         res.status(201).json({
//           message: { msgBody: "Account created successfully", msgError: false },
//         });
//       }
//     });
//   });
// });

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
router.post("/", (req, res) => {
  // try {
  //   const salt = await bcrpyt.genSalt();
  //   const hashedPassword = await bcrpyt.hash(req.body.password, salt);
  //   console.log(salt);
  //   console.log(hashedPassword);
  //   const user = {
  //     username: req.body.username,
  //     password: hashedPassword,
  //   };
  // } catch (err) {}
  const { username, password, role } = req.body;
  User.findOne({ username }, (error, user) => {
    if (error)
      res.status(500).json({ message: { msgBody: "Error occured", msgError: true } });
    if (user)
      res
        .status(400)
        .json({ message: { msgBody: "Username is already taken", msgError: true } });

    const newUser = new User({ username, password, role });
    newUser.save((error) => {
      if (error) {
        res.status(500).json({ message: { msgBody: "Error occured", msgError: true } });
      } else {
        res.status(201).json({
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
