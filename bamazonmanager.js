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
            viewItems();
        } else if (response.managerAction === "View low stock items") {
            lowStock();
        } else if (response.managerAction === "Add to stock") {
            addStock();
        };
    });
};

function viewItems() {
    connection.query('SELECT * FROM items', function (err, response) {
        console.table(response)
        if (err) { throw err };
        connection.end();
    });
};

function lowStock() {
    connection.query("SELECT * FROM items", function (err, response) {
        // console.table(response)
        // console.log(response)
        for (let i = 0; i < response.length; i++) {
            if (response[i].Stock <= 5) {
                console.table(response[i])
            };
        };
        connection.end();
    });
};

function addStock() {
    inquirer.prompt([
        {
            message: "What is the id of the item you would like to add to?",
            name: "add",
            validate: function (value) {
                if (isNaN(value) === false) { return true }
            }
        },
        {
            message: "How many would you like to add to the current stock?",
            name: "addCount",
            validate: function (value) {
                if (isNaN(value) === false) { return true }
            }
        },
    ]).then(function (response) {
        connection.query("UPDATE items SET ? WHERE ?", [
            {
                stock: response.addCount
            },
            {
                id: response.add
            },
        ]), function(err, data) {
            console.log(data)
        };
    });
};