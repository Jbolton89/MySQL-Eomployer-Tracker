const mysql = require('mysql');
const inquirer = require('inquirer');

// Connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost', 
// using port 3306
    port:3306, 
// username 
    user: 'root', 

// Password
password: 'tazzie01', 
database: 'employee_db',

}); 
// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as i ${connection.threadId}`);
    connection.end();
}); 
