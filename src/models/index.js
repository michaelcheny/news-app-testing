import mongoose from "mongoose";

import User from "./user";
// import Message from "./message";
import Article from "./article";

const connectDb = () => {
  return mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};

/* 88888888888888888888888888*/
/* testing dummy shittt */

// const userInput = {
//   username: "michael",
//   password: "password",
//   role: "admin",
// };

// const user = new User(userInput);
// user.save((error, response) => {
//   if (error) console.log(error);
//   console.log(response);
// });

/* END OF TESTING DUMMY SHIT */
// &&&&&&&&&&&&&&&&&&&&&&&&&&& //

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log(`Connected to DB`));

const models = { User, Article };

export { connectDb };
export default models;
