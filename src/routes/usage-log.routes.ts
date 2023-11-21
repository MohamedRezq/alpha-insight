// src/routes/usage-log.routes.ts
import express from "express";
import * as usageLogController from "../controllers/usage-log.controller";

const router = express.Router();

router.get("/", usageLogController.getAllUsageLogs);
router.get("/:id", usageLogController.getUsageLogById);
router.post("/", usageLogController.createUsageLog);
router.put("/:id", usageLogController.updateUsageLog);
router.delete("/:id", usageLogController.deleteUsageLog);

export default router;
