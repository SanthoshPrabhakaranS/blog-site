import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    blogImage: { type: String, default: "" },
    blogTitle: { type: String, required: true },
    blogContent: { type: String, required: true },
    blogCategory: { type: String, required: true },
  },
  { timestamps: true }
);

export const Blog = mongoose.model("Blog", BlogSchema);
