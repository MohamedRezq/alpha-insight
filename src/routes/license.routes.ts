// src/routes/license.routes.ts
import express from "express";
import * as licenseController from "../controllers/license.controller";

const router = express.Router();

router.get("/", licenseController.getAllLicenses);
router.get("/:id", licenseController.getLicenseById);
router.post("/", licenseController.createLicense);
router.put("/:id", licenseController.updateLicense);
router.delete("/:id", licenseController.deleteLicense);

export default router;
