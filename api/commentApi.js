import express from "express";
import CommentController from "../controller/commentController";
import TokenController from "../utils/tokenController";

const router = express.Router();
router.get("/", CommentController.listComment);
router.post("/", TokenController.verifyToken, CommentController.createComment);
router.put(
  "/:cid",
  TokenController.verifyToken,
  CommentController.updateComment
);

export default router;
