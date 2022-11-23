import express from "express";
import PostController from "../controller/postController";

const router = express.Router();
router.get("/:pid", PostController.findOnePost);
router.get("/", PostController.listPost);
router.post("/", PostController.createPost);
router.patch("/:pid", PostController.patchPost);

export default router;
