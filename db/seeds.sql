INSERT INTO department (dept_name)
VALUES 
('Cheese'), ('Events'), ('Janitorial'), ('Distribution'), ('IT');

INSERT INTO roles (title, salary, department_id )
VALUES 
('Cheesemaker', 100000, 1),
('Banquet Captain', 80000, 2),
('Sanitation', 50000, 3),
('Fork Lift Driver', 90000, 4),
('Programmer', 150000, 5),
('Milkman', 70000, 1),
('Roomba Coach', 40000 , 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id )
VALUES 
('Ben', 'Franklin', 1, 1),
('Doug', 'Funny', 2, 2),
('Jerry', 'Seinfeld', 4, 1),
('Tom', 'Jode', 3, 3),
('Joey', 'Chestnut', 5, 4),
('Leroy', 'Brown', 1, 2),
('Zach', 'Taylor', 3, 4);
