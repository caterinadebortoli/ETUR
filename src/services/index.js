import { readcustomer } from './customers.js';
import readlineSync from 'readline-sync';
import { deleteCustomerById } from './customers.js';
import { CreateCustomer } from './customers.js';
import { routes } from './customers.js'
import Fastify from 'fastify'
  
const fastify = Fastify({
  logger:true
})

try{
    await fastify.listen(3000);
}catch (err){
    fastify.log.error(err);
    process.exit(1);
}

/*const customerName = readlineSync.question('Type in the Customer Name: ');
const id = readlineSync.question('Type in the Customer Number: ');
CreateCustomer(id,customerName)
const idinput = readlineSync.question('Type in the Customer id: ');
console.log(readcustomer(idinput))
deleteCustomerById(idinput)*/
fastify.register(routes);
