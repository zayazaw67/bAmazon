const mysql = require("mysql");
const inquirer = require('inquirer');
const Table = require('cli-table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bAmazon"
});

function displayStore() {
    connection.query('SELECT * FROM items', function (err, response) {
        if (err) { throw err };
        // console.log(response)
        let newTable = new Table({
            head: ['id', 'ItemName', 'DepartmentName', 'Price', 'Stock'],
            colWidths: [10, 20, 20, 20, 20]
        });
        for (let i = 0; i < response.length; i++) {
            newTable.push(response[i].id, response[i].ItemName, response[i].DepartmentName, response[i].Price, response[i].Stock)
        };
        // console.log(newTable.toString()); not working???
        console.log(newTable.toString());
        buyStuff();
    });
};

function buyStuff() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What item would you like to purchase?"
        },
        {
            name: "count",
            type: "input",
            message: "How many would you like to purchase?"
        }
    ]).then(function (response) {
        let countWanted = response.count;
        let itemWanted = response.item;
        databaseBuy(itemWanted, countWanted);
    });
};

function databaseBuy(item, requiredAmount) {
    connection.query(`SELECT * FROM items WHERE ItemName = '${item}'`, function (error, response) {
        console.log(response)
        if (error) { throw error };
        if (requiredAmount <= response[0].Stock) {
            let price = response[0].Price * requiredAmount;
            console.log("Your total is " + price);
            connection.query(`UPDATE items SET Stock = Stock - ${requiredAmount} WHERE ItemName = '${item}'`);
        } else { console.log("We don't have that many in stock! Look again.") };
        connection.end();
    })
}

displayStore();
