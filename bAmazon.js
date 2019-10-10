const mysql = require("mysql");
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bAmazon"
});

function displayStore() {
    connection.query('SELECT * FROM items', function (err, response) {
        console.table(response)
        if (err) { throw err };
        buyStuff();
    });
};

function buyStuff() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What is the id of the item you would like to purchase?",
            validate: function (value) {
                if (isNaN(value) === false) { return true }
            }
        },
        {
            name: "count",
            type: "input",
            message: "How many would you like to purchase?",
            validate: function (value) {
                if (isNaN(value) === false) { return true }
            }
        },
    ]).then(function (response) {
        let countWanted = response.count;
        let itemWanted = response.item;
        databaseBuy(itemWanted, countWanted);
    });
};

function databaseBuy(item, requiredAmount) {
    connection.query(`SELECT * FROM items WHERE id = '${item}'`, function (error, response) {
        // console.log(response)
        if (error) { throw error };
        if (requiredAmount <= response[0].Stock) {
            let price = response[0].Price * requiredAmount;
            console.log("Your total is " + price);
            connection.query(`UPDATE items SET Stock = Stock - ${requiredAmount} WHERE id = '${item}'`)
        connection.query(`SELECT * FROM items WHERE id = '${item}'`, function (error, response) {
            console.log("There are now " + response[0].Stock + " " + response[0].ItemName + " remaining.")
        });
        } else { console.log("We don't have that many in stock! Look again.") };
        connection.end();
    })
}

displayStore();
