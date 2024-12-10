import { DataTypes, Model } from "sequelize";

import sequelizeConnection from "../db/connection";

class Doctors extends Model {
  public id!: number;
  public user_id!: number;
  public specialization!: string;
  public experience_yrs!: number;
  public qualification!: string;
  public status!: boolean;
  public clinic_address!: string;
  public gender!: string;
  public readonly created_at!: Date;
  public readonly last_updated!: Date;
}

Doctors.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    specialization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience_yrs: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qualification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    clinic_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "doctors",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

export default Doctors;
