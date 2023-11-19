// src/routes/employee.routes.ts
import express from "express";
import * as employeeController from "../controllers/employee.controller";

const router = express.Router();

router.get("/employees", employeeController.getAllEmployees);
router.get("/employees/:id", employeeController.getEmployeeById);
router.post("/employees", employeeController.createEmployee);
router.put("/employees/:id", employeeController.updateEmployee);
router.delete("/employees/:id", employeeController.deleteEmployee);

export default router;
