// src/routes/department.routes.ts
import express from "express";
import * as departmentController from "../controllers/department.controller";

const router = express.Router();

router.get("/", departmentController.getAllDepartments);
router.get("/:id", departmentController.getDepartmentById);
router.post("/", departmentController.createDepartment);
router.put("/:id", departmentController.updateDepartment);
router.delete("/:id", departmentController.deleteDepartment);

export default router;
