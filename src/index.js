import "dotenv/config";
import cors from "cors";
import express from "express";
const port = process.env.PORT;
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import models from "./models";
import routes from "./routes";

const app = express();

// middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//
const connectDb = () => {
  return mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log(`Connected to DB`));

// routes
app.use("/users", routes.user);
// app.use("/articles", routes.article);
// app.use("/session", routes.session);
// app.use("/messages", routes.message);

// FOR DEVELOPMENT
const eraseDatabaseOnSync = true;

// connects to database, then clears the db FOR DEVELOPMENT
connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([models.User.deleteMany({}), models.Article.deleteMany({})]);
  }
  app.listen(port, () => console.log("Server Started on port " + port));
});
