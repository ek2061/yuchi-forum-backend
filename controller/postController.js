import dotenv from "dotenv";
import { ERROR } from "../constant/ERROR";
import { sequelize } from "../db";
import { postModel } from "../model";
dotenv.config();

const Post = sequelize.define("tb_post", postModel, {});

class PostController {
  async findOnePost(req, res, next) {
    try {
      const pid = req.params.pid;
      if (!pid) {
        return next(ERROR.InfoIncomplete);
      }
      const post = await Post.findOne({
        where: { pid },
      });
      res.status(200).json(post);
    } catch (err) {
      console.log(err);
      return next(ERROR.ServerError);
    }
  }
}

export default new PostController();
