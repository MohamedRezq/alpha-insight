// src/controllers/department.controller.ts
import { Request, Response } from "express";
import Department from "../models/Department";

export const getAllDepartments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const departments = await Department.findAll();
    res.status(200).json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getDepartmentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const department = await Department.findByPk(id);
    if (department) {
      res.status(200).json(department);
    } else {
      res.status(404).send("Department not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const createDepartment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id_source, organization_id, name, budget, data } = req.body;
  try {
    const newDepartment = await Department.create({
      id_source,
      organization_id,
      name,
      budget,
      data,
    });
    res.status(201).json(newDepartment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateDepartment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { id_source, organization_id, name, budget, data } = req.body;
  try {
    const department = await Department.findByPk(id);
    if (department) {
      department.id_source = id_source;
      department.organization_id = organization_id;
      department.name = name;
      department.budget = budget;
      department.data = data;
      await department.save();
      res.status(200).json(department);
    } else {
      res.status(404).send("Department not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteDepartment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const department = await Department.findByPk(id);
    if (department) {
      await department.destroy();
      res.status(204).send();
    } else {
      res.status(404).send("Department not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
