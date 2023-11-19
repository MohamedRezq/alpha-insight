// src/routes/department.routes.ts
import express from "express";
import * as departmentController from "../controllers/department.controller";

const router = express.Router();

router.get("/departments", departmentController.getAllDepartments);
router.get("/departments/:id", departmentController.getDepartmentById);
router.post("/departments", departmentController.createDepartment);
router.put("/departments/:id", departmentController.updateDepartment);
router.delete("/departments/:id", departmentController.deleteDepartment);

export default router;
