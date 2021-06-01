const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const {
    restoreDefaultPrompts
} = require('inquirer');
require('dotenv').config();

// Connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',
    // using port 3306
    port: 3306,
    // username 
    user: process.env.DB_USER,

    // Password
    password: process.env.DB_PASS,
    database: 'employee_db',

});

const start = () => {
    inquirer
        .prompt([{
            name: 'optionsMenu',
            type: 'list',
            message: 'Please select from the below options -',
            choices: [
                'View Departments',
                'View Roles',
                'View Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update A Department',
                'Update a Role',
                'Update an Employee'
            ]
        }])
        .then((answer) => {
            if (answer.optionsMenu === 'View Departments') {
                viewDepartments();
            } else if (answer.optionsMenu === 'View Roles') {
                viewRoles();
            } else if (answer.optionsMenu === 'View Employees') {
                viewEmployees();
            } else if (answer.optionsMenu === 'Add a Department') {
                addDepartment();
            } else if (answer.optionsMenu === 'Add a Role') {
                addRole();
            } else if (answer.optionsMenu === 'Add an Employee') {
                addEmployee();
            } else if (answer.optionsMenu === 'Update a Department') {
                updateDepartment();
            } else if (answer.optionsMenu === 'Update a Role') {
                updateRole();
            } else if (answer.optionsMenu === 'Update an Eomployee') {
                updateEmployee();
            } else {
                connection.end();
            }
        })
};
start();

const viewDepartments = () => {
    connection.query('SELECT id, name AS department FROM department', (err, res) => {
        console.log('Viewing Departments...\n');
        if (err) throw err;
        console.table(res);
        start();
    })
};

const viewRoles = () => {
    console.log('Viewing Roles...\n');
    connection.query('SELECT id, title, salary, department_id FROM role ORDER BY role.id',
        (err, res) => {
            if (err) throw (err);
            console.table(res);
            start();
        })
};

const viewEmployees = () => {
    console.log('Viewing Employees.....\n');
    connection.query('SELECT * FROM employee JOIN role ON employee.role_id=role.id',
        (err, res) => {
            if (err) throw (err);
            console.table(res);
            start();
        })
};

const addDepartment = () => {
    inquirer
        .prompt([{
                name: 'department',
                type: 'input',
                message: 'What is the name of your new Department?',
                validate(value) {
                    if ( !value === true) {
                        return 'Please type a valid Department name.'
                    } else {
                        return true;
                    }
                }
            },
            // {
            //     name: 'addEmployees',
            //     type: 'checkbox',
            //     message: 'Are any of your existing employees moving across to the new Department?',
            //     validate(value) {
            //         if (!value === true) {
            //             return 'Please type whatever';
            //         } else {
            //             return true;
            //         }
            //     }
            // },
        ])
        .then((input) => {
            connection.query(
                'INSERT INTO department SET ?', {
                    name: input.department.trim(),
                },
                (err, res) => {
                    if (err) throw err;
                    console.table("New Department Added to Database", );
                    start();
                }
            );
        });
};


const addRole = () => {
    let departmentArr = [];
    connection.query('SELECT id,name FROM department', (err, result) => {
        if (err) throw (err);

        inquirer
            .prompt([{
                    name: 'addRole',
                    type: 'input',
                    message: 'What is the name of the new role?',
                    validate(input) {
                        if (!input) {
                            return 'You need to enter something'
                        } else {
                            return true;
                        }
                    }
                },
                {
                    name: "addSalary",
                    type: "number",
                    message: "What is the salary of the new role?",
                    validate(value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    },
                },
                {
                    name: "addDepartment",
                    type: "list",
                    choices() {
                        result.forEach((department) => {
                            departmentArr.push(department.name);

                        });
                        return departmentArr;

                    }
                    
                }
            ])
            .then((answer) => {
                let addDepartmentId;
                result.forEach((department) => {
                    if (department.name = answer.addDepartment) {
                        department = addDepartmentId;
                    }
                });

                connection.query(
                    'INSERT INTO role SET ?', {
                        title: answer.addRole,
                        salary: answer.addSalary,
                        department_id: answer.addDepartment,
                    },
                    (err, res) => {
                        console.table("Your role has been successfully added!!");
                        start();
                    }
                );
            });
    });
};

const addEmployee = async () => {
    let roles;
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        roles = res;
    });

    connection.query(`SELECT id, CONCAT(last_name, " ", first_name ) AS employee FROM employee`, (err, res) => {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "last_name",
                type: "input",
                messsage: "What is the new employees last name?",
                validate(input) {
                    if (!input) {
                        return 'You need to enter something..'
                    } else {
                        return true;
                    }
                }
            },
            {
                name: "first_name",
                type: "input",
                message: "What is the new employees first name?",
                validate(input) {
                    if (!input) {
                        return 'You need to enter something..'
                    } else
                        return true;
                }
            },
            {
                name: "role",
                type: "list",
                choices() {
                    let optionsArr = [];
                    roles.forEach(role => {
                        optionsArr.push(role.title)
                    });
                    return optionsArr;
                },
                message: "What is the role of your new employee?",
            }
        ])
        .then((answer) => {
            let roleId = roles.find(role => role.title === answer.role).id;

            connection.query(
                'INSERT INTO employee set ?', {
                    last_name: answer.last_name,
                    first_name: answer.first_name,
                    role_id: roleId,
                },
                (err, res) => {
                    if (err) throw err;
                    console.table('You have successfully added a new employee!');
                    start();
                }
            )

        })
});
}

        // const updateDepartment = () => { 
        // // const updateProduct = () => {
        //   console.log('Updating all Rocky Road quantities...\n');
        //   const query = connection.query(
        //     'UPDATE products SET ? WHERE ?',
        //     [
        //       {
        //         quantity: 100,
        //       },
        //       {
        //         flavor: 'Rocky Road',
        //       },
        //     ],
        //     (err, res) => {
        //       if (err) throw err;
        //       console.log(`${res.affectedRows} products updated!\n`);
        //       // Call deleteProduct AFTER the UPDATE completes
        //       deleteProduct();
        //     }
        //   );

        //   // logs the actual query being run
        //   console.log(query.sql);
        // };

        // }

        const updateDepartment = () => {
            //  for each as the choices to choose from
        }

        const updateRole = () => {

        }

        const updateEmployee = () => {

        }
        // connect to the mysql server and sql database
        connection.connect((err) => {
            if (err) throw err;
            console.log(`connected as i ${connection.threadId}`);
        });