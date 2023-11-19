// src/controllers/employee.controller.ts
import { Request, Response } from "express";
import Employee from "../models/Employee";

export const getAllEmployees = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getEmployeeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByPk(id);
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    id_source,
    organization_id,
    department_id,
    first_name,
    last_name,
    avatar_url,
    email_address,
    mobile,
    role,
    status,
    data,
  } = req.body;
  try {
    const newEmployee = await Employee.create({
      id_source,
      organization_id,
      department_id,
      first_name,
      last_name,
      avatar_url,
      email_address,
      mobile,
      role,
      status,
      data,
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const {
    id_source,
    organization_id,
    department_id,
    first_name,
    last_name,
    avatar_url,
    email_address,
    mobile,
    role,
    status,
    data,
  } = req.body;
  try {
    const employee = await Employee.findByPk(id);
    if (employee) {
      employee.id_source = id_source;
      employee.organization_id = organization_id;
      employee.department_id = department_id;
      employee.first_name = first_name;
      employee.last_name = last_name;
      employee.avatar_url = avatar_url;
      employee.email_address = email_address;
      employee.mobile = mobile;
      employee.role = role;
      employee.status = status;
      employee.data = data;
      await employee.save();
      res.status(200).json(employee);
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByPk(id);
    if (employee) {
      await employee.destroy();
      res.status(204).send();
    } else {
      res.status(404).send("Employee not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
