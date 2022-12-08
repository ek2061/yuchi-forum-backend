import { DataTypes } from "sequelize";

export const userModel = {
  uid: { type: DataTypes.STRING, primaryKey: true },
  nickname: DataTypes.STRING,
  password: DataTypes.STRING,
};
