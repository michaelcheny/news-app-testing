import mongoose from "mongoose";

import User from "./user";
import Message from "./message";

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

const models = { User, Message };

export { connectDb };
export default models;
