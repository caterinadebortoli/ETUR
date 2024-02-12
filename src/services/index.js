import Customer from './customers.js';
import { customers } from './customers.js';
import { Create } from './customers.js';
import { readcustomer } from './customers.js';
Create();
function showcustomers(){
    return customers
}
let idinput = prompt("give the id of the customer you would like to read: ")
console.log(readcustomer(idinput))
console.log(showcustomers())