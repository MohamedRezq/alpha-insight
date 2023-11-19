// src/controllers/usage-log.controller.ts
import { Request, Response } from "express";
import UsageLog from "../models/UsageLog";

export const getAllUsageLogs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const usageLogs = await UsageLog.findAll();
    res.status(200).json(usageLogs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getUsageLogById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const usageLog = await UsageLog.findByPk(id);
    if (usageLog) {
      res.status(200).json(usageLog);
    } else {
      res.status(404).send("Usage Log not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const createUsageLog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    id_source,
    employee_id,
    session_time_stamp,
    session_duration_in_sec,
    data,
  } = req.body;
  try {
    const newUsageLog = await UsageLog.create({
      id_source,
      employee_id,
      session_time_stamp,
      session_duration_in_sec,
      data,
    });
    res.status(201).json(newUsageLog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateUsageLog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const {
    id_source,
    employee_id,
    session_time_stamp,
    session_duration_in_sec,
    data,
  } = req.body;
  try {
    const usageLog = await UsageLog.findByPk(id);
    if (usageLog) {
      usageLog.id_source = id_source;
      usageLog.employee_id = employee_id;
      usageLog.session_time_stamp = session_time_stamp;
      usageLog.session_duration_in_sec = session_duration_in_sec;
      usageLog.data = data;
      await usageLog.save();
      res.status(200).json(usageLog);
    } else {
      res.status(404).send("Usage Log not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteUsageLog = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const usageLog = await UsageLog.findByPk(id);
    if (usageLog) {
      await usageLog.destroy();
      res.status(204).send();
    } else {
      res.status(404).send("Usage Log not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
