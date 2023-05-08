import { Blog } from "../models/BlogSchema.js";

//GET CATEGORY
export const getCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const foundCategory = await Blog.find({ blogCategory: category });
    if (!foundCategory[0])
      return res.status(200).json({ message: "No blogs in this category" });
    res.status(200).json({ data: foundCategory });
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};
