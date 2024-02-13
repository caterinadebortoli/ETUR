import { readcustomer } from './customers.js';
import readlineSync from 'readline-sync';
import { deleteCustomerById } from './customers.js';
import { CreateCustomer } from './customers.js';
import { customerRoutes } from './customers.js'
import Fastify from 'fastify'
  
const fastify = Fastify({
  logger:true
})

async function startServer() {
    try {
      await fastify.listen(3000);
      console.log('Server started successfully');
    } catch (err) {
      console.error('Error starting server:', err);
      process.exit(1);
    }
  }
  
  fastify.register(customerRoutes, { prefix: "/customers" });
  
  startServer();

/*const customerName = readlineSync.question('Type in the Customer Name: ');
const id = readlineSync.question('Type in the Customer Number: ');
CreateCustomer(id,customerName)
const idinput = readlineSync.question('Type in the Customer id: ');
console.log(readcustomer(idinput))
deleteCustomerById(idinput)*/

