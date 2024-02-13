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
    return customers.some(customer=>customer.number==id)
  }

  export function CreateCustomer(id,customerName){
    let is_valid=validateid(id)
    let does_exist=doesCostumerExist(id)
    if (is_valid && does_exist==false)
    {
      const customer = new Customer(customerName,customerNumber)
      customers.push(customer)    }
    else
    {
      console.log("The id given is not valid")
    }
  }

  export function deleteCustomerById(id) {
    const index = customers.findIndex(customer => customer.number === id);

    if (index !== -1) {
      customers.splice(index, 1);
      console.log(`Customer with Number ${id} deleted successfully.`);
    } else {
      console.log(`Customer with Number ${id} not found.`);
    }
  }

  export function readcustomer(id){
    let customer = customers.find(customer=>customer.id==id)
    return customer
  }

  export function showallcustomers(){
    return customers
  }