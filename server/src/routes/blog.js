import express from "express"
import { getBlogs, getSingleBlog, updateBlog } from "../controllers/blog.js"

const router = express.Router()

//GET SINGLE BLOG
router.get("/:id", getSingleBlog)

//UPDATE SINGLE BLOG
router.put("/update", updateBlog)


export default router