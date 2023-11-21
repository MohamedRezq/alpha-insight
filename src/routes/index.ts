// src/routes/index.ts
import express from "express";
import departmentRoutes from "./department.routes";
import licenseRoutes from "./license.routes";
import employeeRoutes from "./employee.routes";
import usageLogRoutes from "./usage-log.routes";
import statsHomeRoutes from "./stats.routes";

const router = express.Router();

router.use("/departments", departmentRoutes);
router.use("/licenses", licenseRoutes);
router.use("/employees", employeeRoutes);
router.use("/usage-logs", usageLogRoutes);
router.use("/stats", statsHomeRoutes);

export default router;
