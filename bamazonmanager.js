const mysql = require("mysql");
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bAmazon"
});
managerTools();

function managerTools() {
    inquirer.prompt([
        {
            type: "list",
            message: "Welcome, what would you like to do today?",
            choices: ["View items for sale", "View low stock items", "Add to stock", "Add new item"],
            name: "managerAction"
        }
    ]).then(function (response) {
        console.log(response.managerAction)
        if (response.managerAction === "View items for sale") {
            console.log("viewing items")
        }
    });
}