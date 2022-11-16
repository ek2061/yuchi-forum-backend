import { DataTypes } from "sequelize";

export const userModel = {
  uid: DataTypes.STRING,
  nickname: DataTypes.STRING,
  password: DataTypes.STRING,
};
