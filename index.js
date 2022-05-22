// Packages needed for this application
const { response } = require('express');
const inquirer = require('inquirer');
//const viewDept = require('./dist/viewDept')
const sql = require('mysql2')


const menu = [
    {
    type: 'list',
    name: 'Selections',
    choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit']

    }
]

const connection = sql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'management'
    },
    console.log('connected to management database')
)

function viewDept() {
    connection.connect(function(err) {
        if (err) throw err;
    connection.query(
        `SELECT dept_name FROM department`, function (err, res, fields) {
            if (err) throw err;
            
            console.table(res) 
            mainMenu()
        })  
})
}

function viewRole() {
    connection.connect(function(err) {
        if (err) throw err;
    connection.query(
        `SELECT * FROM roles 
        LEFT JOIN department ON roles.department_id = department.id`, function (err, res, fields) {
            if (err) throw err;
            
            console.table(res) 
            mainMenu()
        })  
})

}

function viewEmployee() {
    connection.connect(function(err) {
        if (err) throw err;
    connection.query(
        `SELECT * FROM employee
        LEFT JOIN roles ON employee.role_id = roles.title`, function (err, res, fields) {
            if (err) throw err;
            
            console.table(res) 
            mainMenu()
        })  
})
}

function mainMenu() {
    const option = [
        {
            type: 'list',
            name: 'Options',
            choices: ['Return to Menu', 'Exit']
        }
    ]
    inquirer.prompt(option)
    .then((response) => {
        switch(response.Options){
            case 'Return to Menu':
                init();
                break;

            case 'Exit':
                console.log('Goodbye!')
                connection.end();    
        }
    })
}


function init() {
    inquirer.prompt(menu)
    .then((answers) => {
        switch(answers.Selections) {
            case 'View all Departments':
                viewDept();
                break;

            case 'View all Roles':
                viewRole();
                break;

            case 'View all Employees':
                viewEmployee();
                break;   
        }
      })
      .catch((error) => {
        if (error.isTtyError) {
          
        }
    })
}

module.exports = init
init()