import dotenv from "dotenv";
import { ERROR } from "../constant/ERROR";
import { sequelize } from "../db";
import { userModel } from "../model";
import { decrypt, encrypt } from "../utils/encrpyPassword";
dotenv.config();

const User = sequelize.define("tb_user", userModel, {});

class UserController {
  async register(req, res, next) {
    try {
      const { nickname, account, password } = req.body;
      if (!nickname || !account || !password) {
        return next(ERROR.InfoIncomplete);
      }
      const user = await User.findOne({
        where: { uid: account },
        attributes: ["uid"],
      });
      if (user) {
        return next(ERROR.UserAlreadyExist);
      }
      const encryptPwd = await encrypt(password);
      User.create({ nickname, uid: account, password: encryptPwd });
      res.status(200).json({ msg: "success" });
    } catch (err) {
      return next(ERROR.ServerError);
    }
  }
  async login(req, res, next) {
    try {
      const { account, password } = req.body;
      if (!account || !password) {
        return next(ERROR.InfoIncomplete);
      }
      const user = await User.findOne({
        where: { uid: account },
      });
      if (!user) {
        return next(ERROR.UserOrPasswordError);
      }
      const isMatch = await decrypt(password, user.password);
      if (isMatch) {
        req.session.uid = user.uid;
        res.status(200).json({
          msg: "login success",
          nickname: user.nickname,
          uid: user.uid,
        });
      } else {
        return next(ERROR.UserOrPasswordError);
      }
    } catch (err) {
      return next(ERROR.ServerError);
    }
  }
}

export default new UserController();
