const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
const dotenv = require('dotenv').config();

// Connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',
    // using port 3306
    port: 3306,
    // username 
    user: process.env.BD_USER,

    // Password
    password: process.env.BD_PASS,
    database: 'employee_db',

});

const start = () => {
    inquirer
        .prompt({
            name: 'optionsMenu',
            type: 'list',
            message: 'Please select from the below options -',
            choices: ['View Departments',
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
        })
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

const viewDepartments = () => {
    console.log('Viewing Departments...\n');
    connection.query('SELECT id, name AS department FROM department', (err, res) => {
        if (err) throw (err);
        cTable(res);
    })
};

const viewRoles = () => {
    console.log('Viewing Roles...\n');
    connection.query('SELECT id, title, salary, department.id, department.name FROM role ORDER BY role.id',
        (err, res) => {
            if (err) throw (err);
            cTable(res);
        })
};





// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as i ${connection.threadId}`);
    connection.end();
});