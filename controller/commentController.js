import dotenv from "dotenv";
import { ERROR } from "../constant/ERROR";
import { sequelize } from "../db";
import { commentModel } from "../model";
dotenv.config();

const Comment = sequelize.define("tb_comment", commentModel, {});

class CommentController {
  async listComment(req, res, next) {
    try {
      const { pid, limit } = req.query;
      if (!pid || !limit) {
        return next(ERROR.InfoIncomplete);
      }
      const comments = await Comment.findAll({
        where: { pid },
        limit: limit > 10 ? 10 : limit,
        order: [["createdat", "DESC"]],
      });
      res.status(200).json(comments);
    } catch (err) {
      return next(ERROR.ServerError);
    }
  }
  async createComment(req, res, next) {
    try {
      const { uid } = req.user;
      const { pid, content } = req.body;
      if (!uid || !pid || !content) {
        return next(ERROR.InfoIncomplete);
      }
      await Comment.create({ uid, pid, content });
      res.status(200).json({ msg: "success" });
    } catch (err) {
      return next(ERROR.ServerError);
    }
  }
  async updateComment(req, res, next) {
    try {
      const { uid } = req.user;
      const cid = req.params.cid;
      const { content } = req.body;
      if (!uid || !cid) {
        return next(ERROR.InfoIncomplete);
      }
      const comment = await Comment.findOne({
        where: { cid },
      });
      if (comment.uid !== uid) {
        return next(ERROR.PermissionDenied);
      }
      if (!comment) {
        return next(ERROR.CommentNotExist);
      }
      await comment.update({ content });
      res.status(200).json({ msg: "success" });
    } catch (err) {
      return next(ERROR.ServerError);
    }
  }
}

export default new CommentController();
