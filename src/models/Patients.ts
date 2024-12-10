import { Model, DataTypes } from "sequelize";

import sequelizeConnection from "../db/connection";

class Patients extends Model {
  public id!: number;
  public user_id!: number;
  public age!: number;
  public dob!: Date;
  public gender!: string;
  public address!: string;
  public blood_group!: string;
  emergency_contact!: string;
}

Patients.init(
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
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "patients",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
);

export default Patients;
