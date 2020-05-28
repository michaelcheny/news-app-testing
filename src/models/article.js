import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // set associations - messages belong to user
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", ArticleSchema);

export default Article;
