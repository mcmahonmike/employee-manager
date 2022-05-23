// Packages needed for this application
const inquirer = require('inquirer');
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
        LEFT JOIN roles ON employee.role_id = roles.id`
        , function (err, res, fields) {
            if (err) throw err;
            
            console.table(res) 
            mainMenu()
        })  
})
}

function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: 'What is the Depatment name you would like to add?'
        }
    ])
    .then((response) => {
    const mysql = `INSERT INTO department (dept_name)
                   VALUES (?) `
    params = [response.newDept]
  
        connection.query(mysql, params, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            console.table(res) 
            viewDept()
        })  
})
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the name of the Role you would like to add?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is Salary of the new role?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which Department will the new Role join? (1 = Cheese, 2 = Events, 3 = Janitorial, 4 = Distribution, 5 = IT',
            choices: [1, 2, 3, 4, 5]
        }
        
    ])
    .then((response) => {
    const mysql = `INSERT INTO roles (title, salary, department_id )
                   VALUES (?,?,?) `
    params = [response.newRole, response.salary, response.department]
  
        connection.query(mysql, params, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            console.table(res) 
            viewRole()
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
                
            case 'Add a Department':
                addDept();
                break; 
                
            case 'Add a Role':
                addRole();
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