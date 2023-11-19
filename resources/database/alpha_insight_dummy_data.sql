-- departments
INSERT INTO departments (id_source, organization_id, name, budget, data) VALUES
(1, 1, 'HR Department', 100000, '{"key": "value1"}'),
(2, 1, 'IT Department', 150000, '{"key": "value2"}'),
(3, 1, 'Finance Department', 120000, '{"key": "value3"}'),
(4, 2, 'Marketing Department', 130000, '{"key": "value4"}'),
(5, 2, 'Sales Department', 110000, '{"key": "value5"}');


-- licenses
INSERT INTO licenses (id, source, id_source, organization_id, seller, application, department_id, billing_cycle, issue_date, total_licenses_count, used_licenses_count, inactive_licenses_count, total_amount_paid, per_user_amount_paid, total_wastage_amount, data) VALUES
(1, 'self', 1, 1, 'Vendor A', 'App A', 1, 'monthly', '2023-01-01', 100, 50, 10, 5000, 50, 200, '{"key": "value6"}'),
(2, 'finance', 2, 1, 'Vendor B', 'App B', 2, 'yearly', '2023-02-01', 200, 100, 20, 10000, 50, 400, '{"key": "value7"}'),
(3, 'sso', 3, 1, 'Vendor C', 'App C', 3, 'monthly', '2023-03-01', 150, 75, 15, 7500, 60, 300, '{"key": "value8"}'),
(4, 'self', 4, 2, 'Vendor D', 'App D', 4, 'yearly', '2023-04-01', 120, 60, 12, 6000, 55, 250, '{"key": "value9"}');

-- employees
INSERT INTO employees (id_source, organization_id, department_id, first_name, last_name, avatar_url, email_address, mobile, role, status, data) VALUES
(1, 1, 1, 'John', 'Doe', 'avatar1.jpg', 'john.doe@example.com', '1234567890', 'Manager', 'active', '{"key": "value10"}'),
(2, 1, 1, 'Jane', 'Smith', 'avatar2.jpg', 'jane.smith@example.com', '9876543210', 'Developer', 'active', '{"key": "value11"}'),
(3, 1, 2, 'Mike', 'Johnson', 'avatar3.jpg', 'mike.johnson@example.com', '5556667777', 'Analyst', 'inactive', '{"key": "value12"}'),
(4, 2, 3, 'Emily', 'Williams', 'avatar4.jpg', 'emily.williams@example.com', '1112223333', 'Designer', 'active', '{"key": "value13"}');

-- usage_logs
INSERT INTO usage_logs (id_source, employee_id, session_time_stamp, session_duration_in_sec, data) VALUES
(1, 1, '2023-03-01 08:00:00', 3600, '{"key": "value14"}'),
(2, 2, '2023-03-02 10:00:00', 1800, '{"key": "value15"}'),
(3, 3, '2023-03-03 12:00:00', 2400, '{"key": "value16"}'),
(4, 4, '2023-03-04 14:00:00', 1200, '{"key": "value17"}');
