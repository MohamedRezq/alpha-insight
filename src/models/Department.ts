// src/models/Department.ts
import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import Employee from "./Employee";

@Table({
  tableName: "departments",
  timestamps: false,
  paranoid: false,
})
export default class Department extends Model {
  @Column
  id_source!: number;

  @Column
  organization_id!: number;

  @Column
  name!: string;

  @Column
  budget!: number;

  @Column(DataType.TEXT)
  data!: string;

  // @ForeignKey(() => Department)
  // @Column
  // department_id!: number;

  @Column
  created_at!: Date;

  @Column
  updated_at!: Date;

  @Column
  deleted_at!: Date;
}
