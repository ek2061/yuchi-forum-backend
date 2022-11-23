import { DataTypes, fn } from "sequelize";

export const postModel = {
  pid: { type: DataTypes.INTEGER, primaryKey: true },
  uid: DataTypes.STRING,
  title: DataTypes.STRING,
  excerpt: DataTypes.STRING,
  content: DataTypes.STRING,
  createdat: { type: DataTypes.STRING, defaultValue: fn("NOW") },
  like: DataTypes.INTEGER,
  dislike: DataTypes.INTEGER,
};
