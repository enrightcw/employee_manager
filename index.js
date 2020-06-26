var mysql = require("mysql");
var inquirer = require('inquirer');
const { response } = require("express");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employee_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n"); 
    start();
    });

    connection.connect(function (err){
        console.log("Connected as id: "+ connection.threadID);
    });

var start = function(){
        inquirer.prompt({
        type: "list", 
        choices: [
            "Add Department",
            "Add Role",
            "Add Employee",
            "View Department",
            "View Roles", 
            "View Employees",
            "Update Employee Role", 
            "Quit"
        ],
        message: "What would you like to do?",
        name: "option"
        })
        .then(function(result){
            console.log("You have entered: " + result.option);

            switch (result.option){
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "View Department":
                    viewDepartment();
                    break;
                case "View Roles":
                    viewRoles();
                    break;
                case "View Employees":
                    viewEmployees();
                    break;
                case "Update Employee Role":
                    updateEmployee();
                    break;
                    default:
                    quit();
                    
            }
        });
        
    };




function addDepartment(){

    inquirer.prompt({

        type: "input",
        message: "What is the name of the department?",
        name: "deptName"
    }).then(function(answer){

        //this still needs works
        connection.query("Insert into Department (name) VALUES (?) ", [answer.deptName], function (err,res){
            if (err) throw (err);
            console.table(res)
            start();
            
        })
    })
}
// start();

function addRole() {
    inquirer.prompt([
        {
            type: "List",
            message: "Please select your role?", 
            choices: function(value){
                let rolearray = rolearray.map(roleName => {res.role})
                return rolearray;
                },
            name: "addRoleTitle"
        },
        {
            type: "input",
            message: "What is the salary for this role?",
            name: "salaryTot"
        },
        {
            type: "input",
            message: "Please list the department ID Number.",
            name: "deptID"
        }
    ]).then(function(answer){
        connection.query("insert into role (title, salaray, department_id) values (?,?,?)", [answer.addRoleTitle, answer.salaryTot, answer.deptID], function( err, res){
            if (err) throw (err);
            console.table(answer);
            start();
        })
    })
};

//function to update employee role
function updateEmployee(){
  let query ="SELECT * FROM employee";
    connection.query(query, function(err,res){
        if (err) throw err;
        console.table(res);
        
        let choicearray = [];
        let rolearray = [];

    inquirer.prompt([
        {
            type: "list",
            name: "empChoice",
            message: "Which employee would you like to update?",
            choices: function(){
                choicearray.map(empName => {res.name})
                return choicearray;
            },
        },{
            type:"list",
            name:"roleChoice",
            message: "What is this employee's new role?",
            choices: function(){
                rolearray.map(roleName => {res.role})
                return rolearray;
                }
        }
        
        ]).then(function(result){
        console.log("You have entered: " + result.empChoice);
        });
        
})
}

function viewDepartment() {
    let query ="SELECT * FROM department";
    connection.query(query, function(err,res){
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewEmployees() {
    let query ="SELECT * FROM employee";
    connection.query(query, function(err,res){
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewRoles() {
    let query ="SELECT * FROM role";
    connection.query(query, function(err,res){
        if (err) throw err;
        console.table(res);
        start();
    })
}

function quit(){
    connection.end();
    process.exit();
}
//Variables Here, class and constructors: department, employee, manager


//inquirer start "What do you want to do?"

//inquirer CRUD

//DB CRUD

//seperate files for employee.js, manager.js, and DB CRUD.js

//seed.sql