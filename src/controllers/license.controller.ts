// src/controllers/license.controller.ts
import { Request, Response } from "express";
import License from "../models/License";

export const getAllLicenses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const licenses = await License.findAll();
    res.status(200).json(licenses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const getLicenseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const license = await License.findByPk(id);
    if (license) {
      res.status(200).json(license);
    } else {
      res.status(404).send("License not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const createLicense = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    source,
    id_source,
    organization_id,
    seller,
    application_name,
    application_slug,
    department_id,
    billing_cycle,
    issue_date,
    total_licenses_count,
    used_licenses_count,
    inactive_licenses_count,
    total_amount_paid,
    per_user_amount_paid,
    total_wastage_amount,
    data,
  } = req.body;
  try {
    const newLicense = await License.create({
      source,
      id_source,
      organization_id,
      seller,
      application_name,
      application_slug,
      department_id,
      billing_cycle,
      issue_date,
      total_licenses_count,
      used_licenses_count,
      inactive_licenses_count,
      total_amount_paid,
      per_user_amount_paid,
      total_wastage_amount,
      data,
    });
    res.status(201).json(newLicense);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateLicense = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const {
    source,
    id_source,
    organization_id,
    seller,
    application_name,
    application_slug,
    department_id,
    billing_cycle,
    issue_date,
    total_licenses_count,
    used_licenses_count,
    inactive_licenses_count,
    total_amount_paid,
    per_user_amount_paid,
    total_wastage_amount,
    data,
  } = req.body;
  try {
    const license = await License.findByPk(id);
    if (license) {
      license.source = source;
      license.id_source = id_source;
      license.organization_id = organization_id;
      license.seller = seller;
      license.application_name = application_name;
      license.application_slug = application_slug;
      license.department_id = department_id;
      license.billing_cycle = billing_cycle;
      license.issue_date = issue_date;
      license.total_licenses_count = total_licenses_count;
      license.used_licenses_count = used_licenses_count;
      license.inactive_licenses_count = inactive_licenses_count;
      license.total_amount_paid = total_amount_paid;
      license.per_user_amount_paid = per_user_amount_paid;
      license.total_wastage_amount = total_wastage_amount;
      license.data = data;
      await license.save();
      res.status(200).json(license);
    } else {
      res.status(404).send("License not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteLicense = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const license = await License.findByPk(id);
    if (license) {
      await license.destroy();
      res.status(204).send();
    } else {
      res.status(404).send("License not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
