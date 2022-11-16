import express from "express";
import PostController from "../controller/postController";

const router = express.Router();
router.get("/:pid", PostController.findOnePost);

export default router;
