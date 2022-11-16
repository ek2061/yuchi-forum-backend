import { DataTypes } from "sequelize";

export const postModel = {
  pid: { type: DataTypes.INTEGER, primaryKey: true },
  uid: DataTypes.STRING,
  title: DataTypes.STRING,
  excerpt: DataTypes.STRING,
  content: DataTypes.STRING,
  createdat: DataTypes.STRING,
};