// src/models/License.ts
import {
  Model,
  Table,
  Column,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import Department from "./Department";

@Table({
  tableName: "licenses",
  timestamps: false,
  paranoid: false,
})
export default class License extends Model {
  @Column
  source!: "self" | "finance" | "sso";

  @Column
  id_source!: number;

  @Column
  organization_id!: number;

  @Column
  seller!: string;

  @Column
  application!: string;

  @ForeignKey(() => Department)
  @Column
  department_id!: number;

  @Column(DataType.ENUM("monthly", "yearly"))
  billing_cycle!: "monthly" | "yearly";

  @Column
  issue_date!: Date;

  @Column
  total_licenses_count!: number;

  @Column
  used_licenses_count!: number;

  @Column
  inactive_licenses_count!: number;

  @Column
  total_amount_paid!: number;

  @Column
  per_user_amount_paid!: number;

  @Column
  total_wastage_amount!: number;

  @Column(DataType.TEXT)
  data!: string;

  @Column
  created_at!: Date;

  @Column
  updated_at!: Date;

  @Column
  deleted_at!: Date;
}
