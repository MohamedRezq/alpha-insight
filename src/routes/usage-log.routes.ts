// src/routes/usage-log.routes.ts
import express from "express";
import * as usageLogController from "../controllers/usage-log.controller";

const router = express.Router();

router.get("/usage-logs", usageLogController.getAllUsageLogs);
router.get("/usage-logs/:id", usageLogController.getUsageLogById);
router.post("/usage-logs", usageLogController.createUsageLog);
router.put("/usage-logs/:id", usageLogController.updateUsageLog);
router.delete("/usage-logs/:id", usageLogController.deleteUsageLog);

export default router;
