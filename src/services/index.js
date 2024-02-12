import Customer from './customers.js';
import { customers } from './customers.js';

console.log("Hello World")
const customerZeiss = new Customer("Zeiss","z2415")
customers.push(customerZeiss)
function showcustomers(){
    return customers
}
console.log(showcustomers())