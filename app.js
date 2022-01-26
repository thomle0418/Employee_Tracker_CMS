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

const validateNum = function(num){
    if (/^[0-9]+$/.test(num)){
        return true;
    }
    return 'Invalid input. Only numeric values are accepted'
};

const addRole = ()=>{
    let departments =[];
    let departmentNames = ['No existing departms in database'];
    
    connection.query(
        'SELECT * FROM department', (err,res)=>{
            if(err) throw err;
            if(res.length>0){
                if(departmentNames[0]=== 'No existing departments in database'){
                    departmentNames.splice(0,1);
                }
                res.forEach(({id, name})=>{
                    departments.push({id, name});
                    departmentNames.push(`${id} | ${name}`);
                });
            }
            inquire.prompt([
                {
                name: 'roleTitle',
                type: 'input', 
                message: 'New role title:',
            }
        ])
        .then((answer)=>{
            let roleExists = false;
            let roleTitle= answer.roleTitle.trim();
            connection.query('SELECT title FROM role', (err, res)=>{
                if(err) throw err;
                res.forEach((item)=>{ //Prevents user from creating roles with the same title
                    if(item.title===roleTitle){
                        roleExists= true;
                    };
                });
                if(roleExists===true){
                    console.log(`The role titled '${roleTitle}' already exists.`);
                    setTimeout(addMenu, 1000);
                }else{
                    inquirer.prompt([{
                        name: 'roleSalary', 
                        type: 'input', 
                        message: 'New role salary:',
                        validate: validateNum
                    },{
                        name: 'roleDepartment', 
                        type: 'list', 
                        message: 'New role department:',
                        choices: departmentNames
                    }
                ])
                .then((answers)=>{
                    let departmentId= '';
                    let splitAnswer= answers.roleDepartment.split(' ');
                    let departmentName = splitAnswer.splice(2).join(' ').trim(); 
                    if(answers.roleDepartment === 'No existing departments in database'){
                        departmentId = null;
                        departmentName= 'No existing departments in database';
                    }else{
                        for (let i = 0; i< departments.length; i++){
                            if(departments[i].name === departmentName){
                                departmentId = departments[i].id;
                            };
                        };
                    };
                    connection.query(
                        `INSERT INTO role(title, salary, department_id) VALUES (?,?,?)`, [roleTitle, parseInt(answers.roleSalary), departmentId],
                        (err,res) => {
                            if(err) throw err;
                            console.log(`'${roleTitle}' role (${answers.roleSalary}/yr | ${departmentName}) successfully added to database.`);
                            setTimeout(mainMenu, 1000);
                        }
                    );
                });
                }
            });
        });
        }
    );
};