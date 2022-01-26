const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { errorMonitor } = require('mysql2/typings/mysql/lib/Connection');

//Building mySQL connection

const connection= mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'mino1234', 
    database: 'employee_db',
    port: 3306,
});

connection.connect(function(err){
    if(err) throw error;
    mainMenu();
});

//Main Menu prompt
const mainMenu = ()=>{
    inquirer.prompt([
        {
            name: 'select',
            type: 'list', 
            message: `What would you like to do?`,
            choices: [
                'Add data', 
                'View data', 
                'Update data', 
                'Delete data', 
                'Exit',
            ]
        }
    ])
    .then((answer)=>{
        switch(answer.select){
            case 'Add data':
                addMenu();
                break;
            case 'View data':
                viewMenu();
                break;
            case 'Update data':
                updateMenu();
                break;
            case 'Delete data':
                deleteMenu();
                break;
            case 'Exit':
                console.log('Application closed.');
                setTimeout(()=>{
                    connection.end();
                },1000);
                break;
            default:
                console.log('Invalid action ');
                break;
        }
    });
};

//Add menu prompt
const addMenu= ()=>{
    inquirer.prompt([{
        name: 'add', 
        type: 'list', 
        message: 'What would you like to do?', 
        choices: [
            'Add an employee', 
            'Add a role', 
            'Add a department', 
            'Return to main menu',
        ]
    }
])
.then((answer)=>{
    switch(answer.add){
        case 'Add an employee':
            addEmployee();
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add a department':
            addDepartment();
            break;
        default:
            mainMenu();
            break;
    }
});
};

//Add department input 

const addDepartment = ()=>{
    inquirer.prompt([
        {
            name: 'departmentName',
            type: 'input',
            message: 'New department name:',
        }
    ])
    .then((answer)=>{
        let departmentExists= false;
        connection.query('SELECT name FROM department', (err,res)=>{
            if(item.name===answer.departmentName.trim()){
                departmentExists=true;
            };
        });
        if(departmentExists=== true){
            console.log(`A department named '${answer.departmentName.trim()}' already exists.`);
            setTimeout(addMenu, 1000);
        }else{
            connection.query(`INSERT INTO department(name) VALUES(?)`, [answer.departmentName.trim()], (err,res)=>{
                if (err) throw err;
                console.log(`'${answer.departmentName.trim()}' department successfully added to database.`);
                setTimeout(mainMenu, 1000);
            });
            }
    });
};
