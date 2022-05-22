INSERT INTO department (dept_name)
VALUES 
('Cheese'), ('Events'), ('Janitorial'), ('Distribution'), ('IT');

INSERT INTO roles (title, salary, department_id )
VALUES 
('Cheesemaker', 100000, 1),
('Banquet Captain', 80000, 2),
('Head of Sanitation', 50000, 3),
('Fork Lift Driver', 90000, 4),
('Lead Programmer', 150000, 5),
('Milk Manager', 70000, 1),
('Roomba Coach', 40000 , 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id )
VALUES 
('Ben', 'Franklin', 6, NULL),
('Doug', 'Funny', 7, 2),
('Jerry', 'Seinfeld', 1, 1),
('Larry', 'Csonka', 3, NULL),
('Joey', 'Chestnut', 4, 4),
('Leroy', 'Brown', 2, NULL),
('Zach', 'Taylor', 5, NULL);
