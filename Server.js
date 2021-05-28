const mysql = require('mysql');
const inquirer = require('inquirer');

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
            if(answer.optionsMenu === 'View Roles') {
                viewRoles();
            } else if (answer.optionsMenu === 'View Employees')
        }





// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as i ${connection.threadId}`);
    connection.end();
});