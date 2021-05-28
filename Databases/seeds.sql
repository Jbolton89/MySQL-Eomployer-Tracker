USE employee_db; 

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ("Frodo","Baggins", 1), 
        ("Aragorn", "Elissar", 2), 
        ("Sauron", "TheDarkLord", 3);

INSERT INTO employee (first_name,last_name,role_id_manager_id)
VALUES  ("Samwise", "Gamgee", 4, 1), 
        ("Merry","Brandybuck", 5, 1), 
        ("Pippin","Took", 6, 1), 
        ("Boromir", "Roland", 7, 2), 
        ("Faramir", "Roland", 8, 2), 
        ("Saruman", "TheWhite", 9, 3), 
        ("Witchking","Angmar", 10, 3);

INSERT INTO role (title, salary, department_id)
VALUES  ("Main Hobbit", 90000, 1)
        ("Main Man", 80000, 2)
        ("Evil Lord", 85000, 3)
        ("Hobbit's main man", 20000, 1),  
        ("Hobbit Navigator", 15000, 1), 
        ("Hobbit Speaker", 10000, 1), 
        ("Human Guard", 30000, 2), 
        ("Human Warrior", 25000, 2), 
        ("White Wizard", 30000, 3),
        ("Nazgul", 25000, 3);

INSERT INTO department (name)
VALUES ("Hobbits"),
        ("Humans"),
        ("Evil Boys");
