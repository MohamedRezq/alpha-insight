// src/routes/license.routes.ts
import express from "express";
import * as licenseController from "../controllers/license.controller";
import { authMiddleware } from "../middleware/authentication.middleware";

const router = express.Router();

router.get("/", authMiddleware, licenseController.getAllLicenses);
router.get("/:id", licenseController.getLicenseById);
router.post("/", licenseController.createLicense);
router.post("/admin/multiple", licenseController.bulkCreateLicenses);
router.put("/:id", licenseController.updateLicense);
router.delete("/:id", licenseController.deleteLicense);

export default router;
