// Packages needed for this application
const inquirer = require('inquirer');
const viewDept = require('./dist/viewDept')


const menu = [
    {
    type: 'list',
    name: 'Selections',
    choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']

    }
]


function init() {
    inquirer.prompt(menu)
    .then((data => {
        viewDept(data), err => {
            if (err) throw new Error(err)
        }
    })
    )
}

init()