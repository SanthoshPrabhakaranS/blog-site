import { Blog } from "../models/BlogSchema.js";
import { User } from "../models/UserSchema.js";

export const createBlog = async (req, res) => {
  try {
    const { userId, blogTitle, blogContent, blogCategory } = req.body;
    const file = req.file;
    const imageUrl = `http://localhost:5001/uploads/${file.filename}`;
    const newBlog = new Blog({
      userId,
      blogTitle,
      blogImage: imageUrl,
      blogContent,
      blogCategory,
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog created!" });
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const data = await Blog.find({});
    if(data.length == 0) return res.status(200).json({ message: "No blogs to show" });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Blog.find({ _id: id });
    const author = await User.find({ _id: data[0].userId });
    res.status(200).json({ data: data[0], author: author[0].userName });
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};

//UPDATE BLOG
export const updateBlog = async (req, res) => {
  try {
    const { blogId, blogTitle, blogContent } = req.body;
    const file = req.file;
    const imageUrl = `http://localhost:5001/uploads/${file.filename}`;
    const blog = await Blog.find({ _id: blogId });

    if ((blogTitle, blogContent)) {
      blog[0].blogImage = imageUrl;
      blog[0].blogTitle = blogTitle;
      blog[0].blogContent = blogContent;
    }
    await blog[0].save();
    res.status(201).json({ message: "Changes updated!" });
  } catch (error) {
    res.status(400).json({ message: `${error.message}` });
  }
};


