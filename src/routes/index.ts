// src/routes/index.ts
import express from "express";
import departmentRoutes from "./department.routes";
import licenseRoutes from "./license.routes";
import employeeRoutes from "./employee.routes";
import usageLogRoutes from "./usage-log.routes";

const router = express.Router();

router.use("/", departmentRoutes);
router.use("/", licenseRoutes);
router.use("/", employeeRoutes);
router.use("/", usageLogRoutes);

export default router;
