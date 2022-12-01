import { DataTypes, fn } from "sequelize";

export const commentModel = {
  cid: { type: DataTypes.INTEGER, primaryKey: true },
  uid: DataTypes.STRING,
  pid: DataTypes.INTEGER,
  content: DataTypes.STRING,
  createdat: { type: DataTypes.STRING, defaultValue: fn("NOW") },
};
