import express from "express";
import PostController from "../controller/postController";
import TokenController from "../utils/tokenController";

const router = express.Router();
router.get("/:pid", PostController.findOnePost);
router.get("/", PostController.listPost);
router.post("/", TokenController.verifyToken, PostController.createPost);
router.patch("/:pid", TokenController.verifyToken, PostController.patchPost);

export default router;
