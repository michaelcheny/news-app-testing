import { Router } from "express";
import Article from "../models/article";
import User from "../models/user";
const passport = require("passport");
const passportConfig = require("../../passport");

const router = Router();

// get all
router.get("/", async (req, res) => {
  console.log(req.session);
  try {
    const articles = await Article.find();
    return res.json(articles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// post
router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { name, username } = req.body;
  const user = await User.findOne({ username });
  console.log(user);
  const newArticle = new Article({ name });
  newArticle.save((error) => {
    console.log(newArticle);
    if (error) {
      return res.status(500).json({ message: { msgBody: "Error occured", msgError: true } });
    } else {
      // user.articles.push(newArticle);
      return res.status(201).json({
        message: { msgBody: "Article created successfully", msgError: false },
      });
    }
  });
});

export default router;
