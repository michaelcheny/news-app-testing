import "dotenv/config";
import cors from "cors";
import express from "express";
const port = process.env.PORT;

// import models from "./models";
import routes from "./routes";

import models, { connectDb } from "./models";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   req.context = {
//     models,
//     me: models.users[1],
//   };
//   next();
// });

// routes
app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/articles", routes.article);
// app.use("/messages", routes.message);

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([models.User.deleteMany({}), models.Article.deleteMany({})]);
  }
  app.listen(port, () => console.log("Server Started on port " + port));
});
