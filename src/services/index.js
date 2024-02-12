import Customer from './customers.js';
import { customers } from './customers.js';
import { Create } from './customers.js';
import { readcustomer } from './customers.js';
import readlineSync from 'readline-sync';

function showcustomers(){
    return customers
}


const customerName = readlineSync.question('Type in the Customer Name: ');
const customerNumber = readlineSync.question('Type in the Customer Number: ');
Create(customerName, customerNumber)
const idinput = readlineSync.question('Type in the Customer id: ');
console.log(readcustomer(idinput))
console.log(showcustomers())