// src/routes/employee.routes.ts
import express from "express";
import * as statsController from "../controllers/stats.controller";
import { authMiddleware } from "../middleware/authentication.middleware";

const router = express.Router();

router.post(
  "/get-top-spending-departments",
  authMiddleware,
  statsController.getTopSpendingDepartments
);

router.post("/get-total-saas-spent", statsController.getTotalSaasSpent);
router.post(
  "/get-license-usage-summary",
  statsController.getLicenseUsageSummary
);
router.post(
  "/get-top-spending-applications",
  statsController.getTopSpendingApps
);
router.post("/get-applications-stats", statsController.getApplicationsStats);
router.post(
  "/get-all-departments-summary",
  statsController.getAllDepartmentSummary
);
router.post(
  "/get-department-budget-vs-spent",
  statsController.getDepartmentBudgetVsSpent
);

export default router;
