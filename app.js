const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

//Building mySQL connection

const connection= mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'mino1234', 
    database: 'employee_db',
    port: 3306,
});

connection.connect(function(err){
    if(err) throw;
    mainMenu();
});

const mainMenu = ()=>{
    inquirer.prompt([
        {
            name: 'action',
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
        switch(answer.action){
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