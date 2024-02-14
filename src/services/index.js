import { readcustomer } from './customers.js';
import readlineSync from 'readline-sync';
import { deleteCustomerById } from './customers.js';
import { CreateCustomer } from './customers.js';
import { customerRoutes } from './customers.js'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { customerReportsRoutes } from './reports.js';
import { devReportsRoutes } from './reports.js';
import { pmReportsRoutes } from './reports.js';
const fastify = Fastify({
  logger:true
})

fastify.register(cors, {
  origin: '*'
});

async function startServer() {
    try {
      await fastify.listen(3000);
      console.log('Server started successfully');
    } catch (err) {
      console.error('Error starting server:', err);
      process.exit(1);
    }
  }
  
  fastify.register(customerRoutes);
  fastify.register(customerReportsRoutes);
  fastify.register(pmReportsRoutes);
  fastify.register(devReportsRoutes);
  
  startServer();

/*const customerName = readlineSync.question('Type in the Customer Name: ');
const id = readlineSync.question('Type in the Customer Number: ');
CreateCustomer(id,customerName)
const idinput = readlineSync.question('Type in the Customer id: ');
console.log(readcustomer(idinput))
deleteCustomerById(idinput)*/