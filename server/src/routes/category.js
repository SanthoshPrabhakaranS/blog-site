import express from "express";
import { getCategory } from "../controllers/category.js";

const router = express.Router();

//GET CATEGORY
router.get("/:category", getCategory);

export default router;
