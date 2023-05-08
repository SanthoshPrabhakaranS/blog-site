import { Blog } from "../models/BlogSchema.js";

//DELETE BLOG
export const deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    console.log(blogId);
    await Blog.deleteOne({ _id: blogId });
    res.status(201).json({ message: "Blog deleted successfully!" });
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};
