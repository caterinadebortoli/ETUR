  import Fastify from 'fastify'
  
  const fastify = Fastify({
    logger:true
  })

  export default class Customer {
    constructor(name, number) {
      this.name = name;
      this.number = number;
    }
  }

  export const customers=[]

  export function validateid(id){
    let is_valid= id.startsWith("ETUR-CN-")
    return is_valid
  }

  export function doesCostumerExist(id){
    return customers.some(customer=>customer.number===id)
  }

  export function login(number){
    let islogged= customers.some(customer=>customer.number===number)
    if (islogged){
      let customer=customers.find(customer=>customer.number===number)
      return customer
    }
    else{
      return new Error('No Customer found')
    }
  }

  export function CreateCustomer(id,customerName){
    let is_valid=validateid(id)
    let does_exist=doesCostumerExist(id)
    if (is_valid && does_exist===false)
    {
      const customer = new Customer(customerName,id)
      customers.push(customer)    }
    else
    {
      console.log("The id given is not valid")
      throw new Error("The id given is not valid")
    }
  }

  export function deleteCustomerById(id) {
    const index = customers.findIndex(customer => customer.number === id);

    if (index !== -1) {
      customers.splice(index, 1);
      console.log(`Customer with Number ${id} deleted successfully.`);
    } else {
      console.log(`Customer with Number ${id} not found.`);
      throw new Error("Customer with Number your id not found.")
    }
  }

  export function readcustomer(id){
    let customer = customers.find(customer=>customer.number===id)
    
    if(customer===undefined)
    {
      throw new Error("Customer not found");
    }
    else
    {
    return customer
    }
  }

  export function showallcustomers(){
    return customers
  }

//#region Schema's

  const getcustomerSchema = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties:{
            customer: { type : 'object'}
          }
          
        }
      }
    }
  }

  const customerSchema = {
    schema: {
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          id: { type: 'string' },
        },
        required: ['name','id']
      },
      response: {
        201: {
          type: 'string',
          
        }
      }
    }
  }

  const deleteSchema = {
    schema: {
      response:{
        200: {
          type: 'string',
        }
      }      
    }
  }
  
//#endregion

  export async function customerRoutes(fastify, options) {
    fastify.get("/customers", async (request, reply) => {
      return showallcustomers()
    });

    fastify.post("/login",async(request,reply)=>{
      try{
        return login(request.body.number)}
        catch(err){
          reply.code(404).send('User not found')
        }
    })
  
    fastify.get("/customers/:id",getcustomerSchema, async (request, reply) => {
      try{
       let customer=readcustomer(request.query.id)
       reply.code(200).send({customer:customer})
      }
        catch(err){
          reply.code(400).send(err)
        }
    });
   
    
    fastify.post("/customers",customerSchema, async (request, reply)=>{
      try{
        CreateCustomer(request.body.id,request.body.name )
        reply.code(201).send('Customer successfully created');
      } 
      catch(err) {
        reply.code(400).send(err);
      }
    })

    fastify.delete("/customers/:id",deleteSchema, async (request, reply)=>{
      try{

        reply.code(200).send("Customer deleted successfully");
      }
      catch(err){
        reply.code(400).send(err)
      }
    })
  }