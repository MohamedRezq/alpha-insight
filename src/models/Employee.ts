// src/models/Employee.ts
import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
  BelongsTo,
} from "sequelize-typescript";
import Department from "./Department";

@Table({
  tableName: "employees",
  timestamps: false,
  paranoid: false,
})
export default class Employee extends Model {
  @Column
  id_source!: number;

  @Column
  organization_id!: number;

  @ForeignKey(() => Department)
  @Column
  department_id!: number;

  @BelongsTo(() => Department)
  department!: Department;

  @Column
  first_name!: string;

  @Column
  last_name!: string;

  @Column
  avatar_url!: string;

  @Column
  email_address!: string;

  @Column
  mobile!: string;

  @Column
  role!: string;

  @Column(DataType.ENUM("inactive", "active"))
  status!: "inactive" | "active";

  @Column(DataType.TEXT)
  data!: string;

  @Column
  created_at!: Date;

  @Column
  updated_at!: Date;

  @Column
  deleted_at!: Date;
}
