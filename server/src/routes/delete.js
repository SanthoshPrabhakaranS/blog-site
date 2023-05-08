import express from "express";
import { deleteBlog } from "../controllers/delete.js";

const router = express.Router();

//DELETE BLOG
router.delete("/:blogId", deleteBlog);

export default router;
