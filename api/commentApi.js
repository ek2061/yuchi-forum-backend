import express from "express";
import CommentController from "../controller/commentController";

const router = express.Router();
router.get("/", CommentController.listComment);
router.post("/", CommentController.createComment);
router.put("/:cid", CommentController.updateComment);

export default router;
