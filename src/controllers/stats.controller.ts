// home.controller.ts
import { Request, Response } from "express";
import sequelize from "../config/database";
import { Op } from "sequelize";
import License from "../models/License";
import Department from "../models/Department";
import Employee from "../models/Employee";

interface DepartmentData {
  department: string;
  total_spent: number;
  chart: { x: string; y: number }[];
}

interface LicenseUsageSummary {
  total_licenses_value: number;
  used_licenses_value: number;
  unused_licenses_value: number;
  used_licenses_count: number;
  unused_licenses_count: number;
  chart: { x: string; used: number; unused: number }[];
}

interface AppData {
  application_name: string;
  application_spent: number;
  percentage: string;
}

interface DepartmentSummary {
  department_name: string;
  total_spent: number | null;
  applications: { application_name: string; application_logo: string }[];
  employees: { employee_name: string; employee_avatar: string }[];
  shift_payment: string;
}

export const getTopSpendingDepartments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { organization_id, time_interval } = req.body;

    // Calculate the start date based on the time_interval
    const startDate = calculateStartDate(time_interval);

    // Find licenses within the specified time interval
    const licenses = await License.findAll({
      where: {
        organization_id,
        issue_date: { [Op.gte]: startDate },
      },
      include: {
        model: Department,
        attributes: ["name"],
      },
    });

    console.log("licenses: ", licenses);

    // Calculate total spending per department
    const departmentSpendingMap = new Map<string, number>();
    const departmentChartDataMap = new Map<
      string,
      { x: string; y: number }[]
    >();

    licenses.forEach((license) => {
      const departmentName = license?.department?.name || "Unknown Department";
      const totalSpent = license.getDataValue("total_amount_paid") || 0;

      // Update total spending for the department
      if (departmentSpendingMap.has(departmentName)) {
        departmentSpendingMap.set(
          departmentName,
          departmentSpendingMap.get(departmentName)! + totalSpent
        );
      } else {
        departmentSpendingMap.set(departmentName, totalSpent);
      }

      // Update chart data for the department
      const chartData = departmentChartDataMap.get(departmentName) || [];
      const chartEntry = {
        x: license.getDataValue("issue_date").toISOString(),
        y: totalSpent,
      };
      departmentChartDataMap.set(departmentName, [...chartData, chartEntry]);
    });

    // Sort departments by total spending in descending order
    const sortedDepartments = Array.from(departmentSpendingMap.entries()).sort(
      (a, b) => b[1] - a[1]
    );

    // Get the top 3 spending departments
    const topDepartments: DepartmentData[] = sortedDepartments
      .slice(0, 3)
      .map(([department, total_spent]) => ({
        department,
        total_spent,
        chart: departmentChartDataMap.get(department) || [],
      }));

    res.status(200).json(topDepartments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTotalSaasSpent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { organization_id, time_interval } = req.body;

    // Calculate the start date based on the time_interval
    const startDate = calculateStartDate(time_interval);

    // Find licenses within the specified time interval
    const licenses = await License.findAll({
      where: {
        organization_id,
        issue_date: { [Op.gte]: startDate },
      },
    });

    // Calculate total spending on SAAS licenses
    const totalSaasSpent = licenses.reduce(
      (total, license) =>
        total + (license.getDataValue("total_amount_paid") || 0),
      0
    );

    // Get total number of employees in the organization
    const totalUsers = await Employee.count({
      where: { organization_id },
    });

    // Calculate per user spent
    const perUserSpent = totalUsers > 0 ? totalSaasSpent / totalUsers : 0;

    res.status(200).json({
      total_saas_spent: totalSaasSpent,
      total_users: totalUsers,
      per_user_spent: perUserSpent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLicenseUsageSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { organization_id, time_interval } = req.body;

    // Calculate the start date based on the time_interval
    const startDate = calculateStartDate(time_interval);

    // Find licenses within the specified time interval
    const licenses = await License.findAll({
      where: {
        organization_id,
        issue_date: { [Op.gte]: startDate },
      },
      include: {
        model: Department,
        attributes: ["name"],
      },
    });

    // Calculate license usage summary
    const licenseUsageSummary: LicenseUsageSummary = licenses.reduce(
      (summary: any, license) => {
        const totalLicensesValue =
          summary.total_licenses_value +
          (license.getDataValue("total_amount_paid") || 0);

        const perUserAmountPaid =
          license.getDataValue("per_user_amount_paid") || 0;
        const usedLicensesValue =
          summary.used_licenses_value +
          (license.getDataValue("used_licenses_count") || 0) *
            perUserAmountPaid;

        const unusedLicensesValue =
          summary.unused_licenses_value +
          (license.getDataValue("total_licenses_count") ||
            0 - (license.getDataValue("used_licenses_count") || 0)) *
            perUserAmountPaid;

        const usedLicensesCount =
          summary.used_licenses_count +
          (license.getDataValue("used_licenses_count") || 0);

        const unusedLicensesCount =
          summary.unused_licenses_count +
          ((license.getDataValue("total_licenses_count") || 0) -
            (license.getDataValue("used_licenses_count") || 0));

        // Update chart data for the license
        const chartData = summary.chart;
        const chartEntry = {
          x: license.getDataValue("issue_date").toISOString(),
          used: usedLicensesValue,
          unused: unusedLicensesValue,
        };
        summary.chart = [...chartData, chartEntry];

        return {
          total_licenses_value: totalLicensesValue,
          used_licenses_value: usedLicensesValue,
          unused_licenses_value: unusedLicensesValue,
          used_licenses_count: usedLicensesCount,
          unused_licenses_count: unusedLicensesCount,
          chart: summary.chart,
        };
      },
      {
        total_licenses_value: 0,
        used_licenses_value: 0,
        unused_licenses_value: 0,
        used_licenses_count: 0,
        unused_licenses_count: 0,
        chart: [],
      }
    );

    res.status(200).json(licenseUsageSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTopSpendingApps = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { organization_id, time_interval, n } = req.body;

    // Calculate the start date based on the time_interval
    const startDate = calculateStartDate(time_interval);

    // Find licenses within the specified time interval
    const licenses = await License.findAll({
      where: {
        organization_id,
        issue_date: { [Op.gte]: startDate },
      },
    });

    // Calculate total spent for each application
    const appSpendingMap = new Map<string, number>();
    let totalSpent = 0;

    licenses.forEach((license) => {
      const appName = license.application_name;

      const appSpent = license.total_amount_paid - license.total_wastage_amount;

      totalSpent += appSpent;

      if (appSpendingMap.has(appName)) {
        appSpendingMap.set(appName, appSpendingMap.get(appName)! + appSpent);
      } else {
        appSpendingMap.set(appName, appSpent);
      }
    });

    // Sort applications by spending in descending order
    const sortedApps = Array.from(appSpendingMap.entries()).sort(
      (a, b) => b[1] - a[1]
    );

    // Get the top n spending applications
    const topApps: AppData[] = sortedApps
      .slice(0, n)
      .map(([appName, appSpent]) => ({
        application_name: appName,
        application_spent: appSpent,
        percentage: ((appSpent / totalSpent) * 100).toFixed(2) + "%",
      }));

    const response = {
      total_spent: totalSpent,
      spent_array: topApps,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getApplicationsStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { organization_id, time_interval } = req.body;

    // Calculate the start date based on the time_interval
    const startDate = calculateStartDate(time_interval);

    // Find licenses within the specified time interval
    const licenses = await License.findAll({
      where: {
        organization_id,
        issue_date: { [Op.gte]: startDate },
      },
    });

    // Calculate application stats
    const totalApplications = licenses.length;
    const paidApplications = licenses.filter(
      (license) => license.total_amount_paid !== 0
    ).length;
    const freeApplications = licenses.filter(
      (license) => license.total_amount_paid === 0
    ).length;

    const response = {
      total_applications: totalApplications,
      paid_applications: paidApplications,
      free_applications: freeApplications,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllDepartmentSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { organization_id, time_interval } = req.body;
    let previousAllDepartmentsTotalSpent, previousStartDate;
    // Calculate the start date based on the time_interval
    const startDate = calculateStartDate(time_interval);

    // Find departments within the specified time interval
    const departments = await Department.findAll({
      where: {
        organization_id,
      },
    });

    const allEmployees = await Employee.findAll({
      attributes: ["first_name", "last_name", "avatar_url"],
      where: {
        organization_id,
      },
    });

    // Calculate department summary
    const departmentSummary: DepartmentSummary[] = await Promise.all(
      departments.map(async (department) => {
        const totalSpent = await License.sum("total_amount_paid", {
          where: {
            organization_id,
            department_id: department.id,
            issue_date: { [Op.gte]: startDate },
          },
        });

        const applications = await License.findAll({
          attributes: ["application_name", "application_slug"],
          where: {
            organization_id,
            department_id: department.id,
            issue_date: { [Op.gte]: startDate },
          },
        });

        const employees = await Employee.findAll({
          attributes: ["first_name", "last_name", "avatar_url"],
          where: {
            organization_id,
            department_id: department.id,
          },
        });

        // Calculate shift payment percentage for the department
        previousStartDate = calculateStartDatePreviousPeriod(
          time_interval,
          startDate
        );
        previousAllDepartmentsTotalSpent = await License.sum(
          "total_amount_paid",
          {
            where: {
              organization_id,
              department_id: department.id,
              issue_date: { [Op.between]: [previousStartDate, startDate] },
            },
          }
        );

        const shiftPayment =
          previousAllDepartmentsTotalSpent !== 0
            ? ((totalSpent || 0) / previousAllDepartmentsTotalSpent) * 100
            : 100;

        // Retrieve application logos based on application slugs
        const applicationLogos = await getApplicationLogos(
          organization_id,
          applications.map((app) => app.application_slug)
        );

        return {
          department_name: department.name,
          total_spent: totalSpent || 0,
          applications: applications.map((app, index) => ({
            application_name: app.application_name,
            application_logo: applicationLogos[index] || "", // Use retrieved application logos
          })),
          employees: employees.map((employee) => ({
            employee_name: `${employee.first_name} ${employee.last_name}`,
            employee_avatar: employee.avatar_url || "", // Leave empty string if not available
          })),
          shift_payment: shiftPayment.toFixed(2) + "%",
        };
      })
    );

    // Calculate total spent for "All Departments"
    const allDepartmentsTotalSpent = await License.sum("total_amount_paid", {
      where: {
        organization_id,
        issue_date: { [Op.gte]: startDate },
      },
    });

    // Retrieve all applications and logos for "All Departments"
    const allDepartmentsApplications = await License.findAll({
      attributes: ["application_name", "application_slug"],
      where: {
        organization_id,
        issue_date: { [Op.gte]: startDate },
      },
    });

    const allDepartmentsApplicationLogos = await getApplicationLogos(
      organization_id,
      allDepartmentsApplications.map((app) => app.application_slug)
    );

    // Calculate shift payment percentage for "All Departments"
    const allDepartmentsShiftPayment = previousAllDepartmentsTotalSpent
      ? (allDepartmentsTotalSpent / previousAllDepartmentsTotalSpent) * 100
      : 100;

    // Include entry for "All Departments"
    const allDepartmentsEntry: DepartmentSummary = {
      department_name: "All Departments",
      total_spent: allDepartmentsTotalSpent || 0,
      applications: allDepartmentsApplications.map((app, index) => ({
        application_name: app.application_name,
        application_logo: allDepartmentsApplicationLogos[index] || "",
      })),
      employees: allEmployees.map((employee) => ({
        employee_name: `${employee.first_name} ${employee.last_name}`,
        employee_avatar: employee.avatar_url || "", // Leave empty string if not available
      })),
      shift_payment: allDepartmentsShiftPayment.toFixed(2) + "%",
    };

    res.status(200).json([...departmentSummary, allDepartmentsEntry]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDepartmentBudgetVsSpent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { organization_id, department_name, time_interval } = req.body;

    // Calculate the start date based on the time_interval
    const startDate = calculateStartDate(time_interval);

    // Find department based on the provided department_name
    const department = await getDepartmentByName(
      organization_id,
      department_name
    );

    if (!department) {
      res.status(404).json({ error: "Department not found" });
      return;
    }

    // Calculate total budget and spent for the specified department
    const totalBudget = department?.budget || 0;

    const totalSpent = await License.sum("total_amount_paid", {
      where: {
        organization_id,
        department_id: department?.id,
        issue_date: { [Op.gte]: startDate },
      },
    });

    // Create the response object
    const response = {
      department_name: department?.name,
      total_budget: totalBudget,
      total_spent: totalSpent || 0,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Helper function to calculate start date based on the time_interval
const calculateStartDate = (time_interval: string): Date => {
  const currentDate = new Date();

  switch (time_interval) {
    case "last_year":
      return new Date(
        currentDate.getFullYear() - 1,
        currentDate.getMonth(),
        currentDate.getDate()
      );
    case "last_six_months":
      return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 6,
        currentDate.getDate()
      );
    default:
      return new Date(0); // All time (beginning of Unix time)
  }
};
// Helper function to calculate start date of the previous period
const calculateStartDatePreviousPeriod = (
  time_interval: string,
  startDate: Date
): Date => {
  const currentDate = new Date(startDate);

  switch (time_interval) {
    case "last_year":
      return new Date(
        currentDate.getFullYear() - 2,
        currentDate.getMonth(),
        currentDate.getDate()
      );
    case "last_six_months":
      return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 6,
        currentDate.getDate()
      );
    default:
      return new Date(0); // All time (beginning of Unix time)
  }
};

// Helper function to get application logos based on application slugs
const getApplicationLogos = async (
  organization_id: number,
  applicationSlugs: string[]
): Promise<string[]> => {
  // Implement logic to retrieve application logos based on application slugs
  // You can use the provided organization_id and applicationSlugs to fetch the logos
  // Replace the following line with your actual logic
  return new Array(applicationSlugs.length).fill("");
};

// Helper function to get department based on the provided department_name
const getDepartmentByName = async (
  organization_id: number,
  department_name: string
): Promise<Department | null> => {
  return Department.findOne({
    where: {
      organization_id,
      name: department_name,
    },
  });
};
