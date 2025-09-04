// models/Post.js
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    author: {
      type: String,
      default: "Anonymous", // you can later link this with a user model
    },
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);

// Prevent model overwrite upon hot reloads in Next.js
export default mongoose.models.Post || mongoose.model("Post", PostSchema);
