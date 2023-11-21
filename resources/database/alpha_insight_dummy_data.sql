-- departments
INSERT INTO departments (id_source, organization_id, name, budget, data) VALUES
(1, 1, 'HR Department', 100000, '{"key": "value1"}'),
(2, 1, 'IT Department', 150000, '{"key": "value2"}'),
(3, 1, 'Finance Department', 120000, '{"key": "value3"}'),
(4, 2, 'Marketing Department', 130000, '{"key": "value4"}'),
(5, 2, 'Sales Department', 110000, '{"key": "value5"}'),
(6, 1, 'R&D Department', 180000, '{"key": "value6"}'),
(7, 1, 'Customer Support', 95000, '{"key": "value7"}'),
(8, 2, 'Legal Department', 160000, '{"key": "value8"}'),
(9, 1, 'Quality Assurance', 140000, '{"key": "value9"}'),
(10, 2, 'Product Management', 200000, '{"key": "value10"}');


-- licenses
INSERT INTO licenses (id, source, id_source, organization_id, seller, application_name, application_slug, department_id, billing_cycle, issue_date, total_licenses_count, used_licenses_count, inactive_licenses_count, total_amount_paid, per_user_amount_paid, total_wastage_amount, data) VALUES
(1, 'self', 1, 1, 'Atlassian', 'Jira Software', 'jira-software', 1, 'monthly', '2023-01-01', 100, 50, 10, 5000, 50, 200, '{"key": "value11"}'),
(2, 'finance', 2, 1, 'Atlassian', 'Confluence', 'confluence', 2, 'yearly', '2023-02-01', 200, 100, 20, 10000, 50, 400, '{"key": "value12"}'),
(3, 'sso', 3, 1, 'Atlassian', 'Jira Software', 'jira-software', 3, 'monthly', '2023-03-01', 150, 75, 15, 7500, 60, 300, '{"key": "value13"}'),
(4, 'self', 4, 2, 'Atlassian', 'Jira Software', 'jira-software', 4, 'yearly', '2023-04-01', 120, 60, 12, 6000, 55, 250, '{"key": "value14"}'),
(5, 'sso', 5, 2, 'Atlassian', 'Confluence', 'confluence', 5, 'monthly', '2023-05-01', 180, 90, 18, 9000, 60, 350, '{"key": "value15"}'),
(6, 'finance', 6, 1, 'Atlassian', 'Jira Software', 'jira-software', 6, 'yearly', '2023-06-01', 250, 120, 25, 12000, 48, 500, '{"key": "value16"}'),
(7, 'self', 7, 2, 'Atlassian', 'Jira Software', 'jira-software', 7, 'monthly', '2023-07-01', 120, 60, 12, 6000, 50, 250, '{"key": "value17"}'),
(8, 'sso', 8, 1, 'Atlassian', 'Jira Software', 'jira-software', 8, 'yearly', '2023-08-01', 180, 90, 18, 9000, 55, 300, '{"key": "value18"}'),
(9, 'self', 9, 1, 'Atlassian', 'Jira Software', 'jira-software', 9, 'monthly', '2023-09-01', 200, 100, 20, 10000, 60, 400, '{"key": "value19"}'),
(10, 'finance', 10, 2, 'Atlassian', 'Confluence', 'confluence', 10, 'yearly', '2023-10-01', 150, 75, 15, 7500, 48, 300, '{"key": "value20"}');


-- employees
INSERT INTO employees (id_source, organization_id, department_id, first_name, last_name, avatar_url, email_address, mobile, role, status, data) VALUES
(1, 1, 1, 'John', 'Doe', 'avatar1.jpg', 'john.doe@example.com', '1234567890', 'Manager', 'active', '{"key": "value21"}'),
(2, 1, 1, 'Jane', 'Smith', 'avatar2.jpg', 'jane.smith@example.com', '9876543210', 'Developer', 'active', '{"key": "value22"}'),
(3, 1, 2, 'Mike', 'Johnson', 'avatar3.jpg', 'mike.johnson@example.com', '5556667777', 'Analyst', 'inactive', '{"key": "value23"}'),
(4, 2, 3, 'Emily', 'Williams', 'avatar4.jpg', 'emily.williams@example.com', '1112223333', 'Designer', 'active', '{"key": "value24"}'),
(5, 2, 4, 'Chris', 'Miller', 'avatar5.jpg', 'chris.miller@example.com', '9998887777', 'Engineer', 'active', '{"key": "value25"}'),
(6, 1, 3, 'Jessica', 'Brown', 'avatar6.jpg', 'jessica.brown@example.com', '3334445555', 'Supervisor', 'inactive', '{"key": "value26"}'),
(7, 1, 4, 'David', 'Clark', 'avatar7.jpg', 'david.clark@example.com', '7778889999', 'Manager', 'active', '{"key": "value27"}'),
(8, 2, 5, 'Sophia', 'Anderson', 'avatar8.jpg', 'sophia.anderson@example.com', '5554443333', 'Analyst', 'active', '{"key": "value28"}'),
(9, 1, 2, 'Robert', 'Smith', 'avatar9.jpg', 'robert.smith@example.com', '1112223333', 'Developer', 'inactive', '{"key": "value29"}'),
(10, 2, 3, 'Olivia', 'Jones', 'avatar10.jpg', 'olivia.jones@example.com', '9998887777', 'Designer', 'active', '{"key": "value30"}');


-- usage_logs
INSERT INTO usage_logs (id_source, employee_id, session_time_stamp, session_duration_in_sec, data) VALUES
(1, 1, '2023-03-01 08:00:00', 3600, '{"key": "value31"}'),
(2, 2, '2023-03-02 10:00:00', 1800, '{"key": "value32"}'),
(3, 3, '2023-03-03 12:00:00', 2400, '{"key": "value33"}'),
(4, 4, '2023-03-04 14:00:00', 1200, '{"key": "value34"}'),
(5, 5, '2023-03-05 16:00:00', 3000, '{"key": "value35"}'),
(6, 6, '2023-03-06 18:00:00', 1500, '{"key": "value36"}'),
(7, 7, '2023-03-07 20:00:00', 2100, '{"key": "value37"}'),
(8, 8, '2023-03-08 22:00:00', 1800, '{"key": "value38"}'),
(9, 9, '2023-03-09 08:00:00', 2400, '{"key": "value39"}'),
(10, 10, '2023-03-10 10:00:00', 1200, '{"key": "value40"}');