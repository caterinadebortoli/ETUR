import { Create } from './customers.js';
import { readcustomer } from './customers.js';
import readlineSync from 'readline-sync';
import { deleteCustomerById } from './customers.js';


const customerName = readlineSync.question('Type in the Customer Name: ');
const customerNumber = readlineSync.question('Type in the Customer Number: ');
Create(customerName, customerNumber)
const number = readlineSync.question('Type in the Customer Number: ');
console.log(readcustomer(number))
deleteCustomerById(number)