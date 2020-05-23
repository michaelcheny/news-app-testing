import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Article = mongoose.model("Article", ArticleSchema);

export default Article;