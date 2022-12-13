import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ERROR } from "../constant/ERROR";
dotenv.config();

class TokenController {
  async signToken(payload) {
    const token = jwt.sign(payload, process.env.JWTSECRET, {
      expiresIn: "1d",
    });

    return token;
  }
  async verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return next(ERROR.TokenError);
    }
    const rtoken = token.replace("Bearer ", "");
    try {
      const result = jwt.verify(rtoken, process.env.JWTSECRET);
      req.user = result;
    } catch (error) {
      return next(ERROR.TokenError);
    }
    return next();
  }
}

export default new TokenController();
