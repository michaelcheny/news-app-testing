import "dotenv/config";
import uuidv4 from "uuid/v4";
import cors from "cors";
import express from "express";
const port = process.env.PORT;

import models from "./models";

import routes from "./routes";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

// app.get("/session", (req, res) => {
//   return res.send(req.context.models.users[req.context.me.id]);
// });

// app.get("/users", (req, res) => {
//   return res.send(Object.values(req.context.models.users));
// });

// app.get("/users/:userId", (req, res) => {
//   return res.send(req.context.models.users[req.params.userId]);
// });

// app.get("/messages", (req, res) => {
//   return res.send(Object.values(req.context.models.messages));
// });

// app.get("/messages/:messageId", (req, res) => {
//   return res.send(req.context.models.messages[req.params.messageId]);
// });

// app.post("/messages", (req, res) => {
//   const id = uuidv4();
//   const message = {
//     id,
//     text: req.body.text,
//     userId: req.context.me.id,
//   };

//   req.context.models.messages[id] = message;

//   return res.send(message);
// });

// app.delete("/messages/:messageId", (req, res) => {
//   const {
//     [req.params.messageId]: message,
//     ...otherMessages
//   } = req.context.models.messages;

//   req.context.models.messages = otherMessages;

//   return res.send(message);
// });

// const
app.listen(port, () => console.log("Server Started on port " + port));
