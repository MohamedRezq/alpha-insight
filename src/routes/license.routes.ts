// src/routes/license.routes.ts
import express from "express";
import * as licenseController from "../controllers/license.controller";

const router = express.Router();

router.get("/licenses", licenseController.getAllLicenses);
router.get("/licenses/:id", licenseController.getLicenseById);
router.post("/licenses", licenseController.createLicense);
router.put("/licenses/:id", licenseController.updateLicense);
router.delete("/licenses/:id", licenseController.deleteLicense);

export default router;
