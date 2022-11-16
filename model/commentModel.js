import { DataTypes } from "sequelize";

export const commentModel = {
  cid: DataTypes.INTEGER,
  uid: DataTypes.STRING,
  pid: DataTypes.INTEGER,
  content: DataTypes.STRING,
  createdAt: DataTypes.STRING,
};
