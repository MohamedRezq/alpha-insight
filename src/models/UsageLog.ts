// src/models/UsageLog.ts
import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
  BelongsTo,
} from "sequelize-typescript";
import Employee from "./Employee";

@Table({
  tableName: "usage_logs",
  timestamps: false,
  paranoid: false,
})
export default class UsageLog extends Model {
  @Column
  id_source!: number;

  @ForeignKey(() => Employee)
  @Column
  employee_id!: number;

  @BelongsTo(() => Employee)
  employee!: Employee;

  @Column
  session_time_stamp!: Date;

  @Column
  session_duration_in_sec!: number;

  @Column(DataType.TEXT)
  data!: string;

  @Column
  created_at!: Date;

  @Column
  updated_at!: Date;

  @Column
  deleted_at!: Date;
}
