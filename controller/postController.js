import dotenv from "dotenv";
import { ERROR } from "../constant/ERROR";
import { sequelize } from "../db";
import { postModel, userModel } from "../model";
import { renameAllKeys, renameKey } from "../utils/tools";
dotenv.config();

const User = sequelize.define("tb_user", userModel, {});
const Post = sequelize.define("tb_post", postModel, {});

User.hasOne(Post, { foreignKey: "uid" });
Post.belongsTo(User, { foreignKey: "uid" });

class PostController {
  async findOnePost(req, res, next) {
    try {
      const pid = req.params.pid;
      if (!pid) {
        return next(ERROR.InfoIncomplete);
      }
      const post = await Post.findOne({
        raw: true,
        where: { pid },
        attributes: { exclude: ["excerpt"] },
        include: [
          {
            model: User,
            required: true,
            attributes: ["nickname"],
          },
        ],
      });
      renameKey(post, "tb_user.nickname", "nickname");
      res.status(200).json(post);
    } catch (err) {
      return next(ERROR.ServerError);
    }
  }
  async listPost(req, res, next) {
    try {
      const { limit } = req.query;
      if (!limit) {
        return next(ERROR.InfoIncomplete);
      }
      const posts = await Post.findAll({
        raw: true,
        limit: limit > 10 ? 10 : limit,
        order: [["createdat", "DESC"]],
        attributes: { exclude: ["content"] },
        include: [
          {
            model: User,
            required: true,
            attributes: ["nickname"],
          },
        ],
      });
      renameAllKeys(posts, "tb_user.nickname", "nickname");
      res.status(200).json(posts);
    } catch (err) {
      return next(ERROR.ServerError);
    }
  }
  async createPost(req, res, next) {
    try {
      const { uid } = req.user;
      const { title, content } = req.body;
      if (!uid || !title || !content) {
        return next(ERROR.InfoIncomplete);
      }
      await Post.create({
        uid,
        title,
        excerpt: content.substring(0, 100).replaceAll("\n", " "),
        content,
      });
      res.status(200).json({ msg: "success" });
    } catch (err) {
      return next(ERROR.ServerError);
    }
  }
  async patchPost(req, res, next) {
    try {
      const { uid } = req.user;
      const pid = req.params.pid;
      const { title, content } = req.body;
      if (!pid) {
        return next(ERROR.InfoIncomplete);
      }
      const post = await Post.findOne({
        where: { pid },
      });
      if (post.uid !== uid) {
        return next(ERROR.PermissionDenied);
      }
      if (!post) {
        return next(ERROR.PostNotExist);
      }
      const excerpt =
        content === null || content === undefined
          ? undefined
          : content.substring(0, 100).replaceAll("\n", " ");
      await post.update({ title, excerpt, content });
      res.status(200).json({ msg: "success" });
    } catch (err) {
      return next(ERROR.ServerError);
    }
  }
}

export default new PostController();
