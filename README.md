# bAmazon

## Node.js + MySQL

### Overview
In this assignment, I will be creating a storefront with MySQL. The store will ask what item a customer wants, and subtracts the amount from the total stock, if the stock permits. If not, the store will not take the order, and you will have to start over.

#### Below is a quick demo of how the store functions

!["Demo!"](assets/demo.gif)

## Faults and Future Development

1. At the moment, you are not able to tell the store which item you want to purchase by the name, so you will have to enter an id. 
2. You are able to enter a number that is beyond the max id listed, but will get errors.
3. Would like to implement a way to prevent this from happening. Perhaps an inquirer and for loop which then shows a list of ids to select from. However, this will not be practical with a huge store.