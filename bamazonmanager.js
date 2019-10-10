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
            viewItems()
        } else if (response.managerAction === "View low stock items") {
            lowStock()
        };
    });
};

function viewItems() {
    connection.query('SELECT * FROM items', function (err, response) {
        console.table(response)
        if (err) { throw err };
    });
};

function lowStock() {
    connection.query("SELECT * FROM items", function(err, response){
        console.log(response)
        for (let i = 0; i < response.length; i++) {
            if (response[i].stock <= 5) {
                console.log(response[i]) else if 
            };
        };
    });
};