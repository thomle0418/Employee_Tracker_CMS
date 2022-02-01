//Require dependencies 
const mysql = require('mysql');
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

//Main Menu prompt for application
// const mainMenu = ()=>{
//     //inquirer will display the question and options in list format
//     inquirer.prompt([
//         {
//             name: 'select',
//             type: 'list', 
//             message: `What would you like to do?`,
//             choices: [
//                 'View all departments', 
//                 'View all roles', 
//                 'View all employees', 
//                 'Add a department', 
//                 'Add a role', 
//                 'Add an employee', 
//                 'Update an employee',
//                 'Exit',
//             ]
//         }
//     ])
//     //when the user selects an option, it will switch to the appropriate expression
//     .then((answer)=>{
//         switch(answer.select){
//             //If selected, query data from departments database and print table to main menu.
//             case 'View all departments':
//                 connection.query('SELECT * FROM departments', (err,res)=>{
//                     if (err) return err;
//                     console.tables(res);
//                     mainMenu();
//                 });
//                 break;
//             //If selected, query data from roles database and print table to main menu.    
//             case 'View all roles':
//                 connection.query('SELECT * FROM roles', (err,res)=>{
//                     if (err) return err;
//                     console.tables(res);
//                     mainMenu();
//                 })
//                 break;
//             //If selected, query data from employees database and print table to main menu.    
//             case 'View all employees':
//                 connection.query('SELECT * FROM employees', (err,res)=>{
//                     if (err) return err;
//                     console.tables(res);
//                     mainMenu();
//                 })
//                 break;
//             //If selected, display prompt for user to input new department to database
//             case 'Add a department':
//                 inquirer.prompt({
//                     name: 'departmentName',
//                     type: 'input',
//                     message: 'New department Name:'
//                 })
//                 .then((userInput) => {
//                     let departmentExists = false;
//                     //Connect to department database.
//                     connection.query('SELECT name FROM department', (err,res)=>{
//                         if(err) return err;
//                         //Check database for existing department
//                         res.forEach((input)=>{
//                             if (input.name===userInput.departmentName.trim()){
//                                 departmentExists = true;
//                             };
//                         });
//                         //If department exists, tell user it already exists and do not add new deparment
//                         if (departmentExists === true){
//                             console.log(`'${userInput.departmentName.trim()} department already exists.`);
//                             setTimeout(mainMenu,1000);
//                         }else{
//                             //If deparment does not exist, add new department to the database and return to the main menu
//                             connection.query('INSERT INTO department (name) VALUES(?)', [userInput.departmentName.trim()], 
//                             (err,res)=>{
//                                 if(err) return err;
//                                 console.log(`'${userInput.departmentName.trim()}' department successfully added!`);
//                                 setTimeout(mainMenu,1000);
//                             })
//                         }
//                     })
//                 })
//                 break;
//             case 'Add a role':
//                 //Needs prompt to enter name, salary, and department for new role
//                 inquirer.prompt([{
//                     name:'newRole',
//                     type: 'input', 
//                     message: 'What is the new role?',
//                 }, 
//                 {
//                     name: 'newSalary',
//                     type: 'input', 
//                     message: 'What is this roles salary?'
//                 },
//                 {
//                     name: 'newDepartment',
//                     type: 'list', 
//                     choice: 'departmentNames',
//                 },
//             ])
//             .then((userInput) => {
//                     let roleExists = false;
//                     //Connect to roles database.
//                     connection.query('SELECT name FROM roles', (err,res)=>{
//                         if(err) return err;
//                         //Check database for existing department
//                         res.forEach((input)=>{
//                             if (input.title===userInput.newRole.trim()){
//                                 roleExists = true;
//                             };
//                         });
//                         //If role exists, tell user it already exists and do not add new role
//                         if (roleExists === true){
//                             console.log(`'${userInput.newRole.trim()} role already exists.`);
//                             setTimeout(mainMenu,1000);
//                         }else{
//                             //If role does not exist, add new role to the database and return to the main menu
//                             connection.query('INSERT INTO roles (title) VALUES(?)', [userInput.newRole.trim()], 
//                             (err,res)=>{
//                                 if(err) return err;
//                                 console.log(`'${userInput.newRole.trim()}' role successfully added!`);
    
//                             });
//                         };
//                     });
//                 });
//             }
//         })
//             .then((userInput) => {
//                 connection.query()

//             })
//         };
