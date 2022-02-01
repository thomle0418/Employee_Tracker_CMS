const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'departmentName',
            type: 'input',
            message: 'New department name:',
        }
    ])
    .then((answer) => {
        let departmentExists = false;
        connection.query('SELECT name FROM department', (err, res) => {
            if (err) throw err;
            res.forEach((item) => { 
                if (item.name === answer.departmentName) {
                    departmentExists = true; 
                }; 
            });

            if (departmentExists === true) {
                console.log(`A department named '${answer.departmentName}' already exists.`);
                setTimeout(addMenu, 1000);
            } else {
                connection.query(
                    `INSERT INTO department(name) VALUES(?)`, [answer.departmentName],
                    (err, res) => {
                        if (err) throw err;
                        console.log(`'${answer.departmentName}' department successfully added to database!`);
                        setTimeout(mainMenu, 1000);
                    }
                );
            }
        });
    });
};

module.exports= addDepartment;