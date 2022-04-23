//Require dependencies 
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');


//Build mySQL connection

const connection= mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'mino1234', 
    database: 'employee_db',
    port: 3306,
});

connection.connect((err)=>{
    if(err) return err; 
    mainMenu();
});

const mainMenu=()=>{
    inquirer.prompt([{
        name:'select', 
        type:'list',
        choices: [
            'View all departments',
            'View all roles', 
            'View all employees', 
            'Add a department', 
            'Add a role', 
            'Add an employee', 
            'Update an employee',
            'Delete an employee',
            'Exit',
        ],
    }])
    .then((answer)=>{
        switch(answer.select){
            case 'View all departments':
                connection.query('SELECT * FROM department',(err,res)=>{
                    if (err) return err;
                    console.table(res);
                    mainMenu();
                });
                break;
                        //If selected, query data from roles database and print table to main menu.    
            case 'View all roles':
                connection.query('SELECT * FROM roles', (err,res)=>{
                    if (err) return err;
                    console.tables(res);
                    mainMenu();
                })
                break;
            //If selected, query data from employees database and print table to main menu.    
            case 'View all employees':
                connection.query('SELECT * FROM employees', (err,res)=>{
                    if (err) return err;
                    console.tables(res);
                    mainMenu();
                })
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee':
                updateEmployee();
                break;
            case 'Delete an employee':
                deleteEmployee();
                break;    
            case 'Exit':
                connection.end();
                break;
            default:
                break;
        }
    });
}; 