export default class Customer {
    constructor(name, number) {
      this.name = name;
      this.number = number;
    }
  }
  export function Create(customerName, customerNumber){
    const customer = new Customer(customerName,customerNumber)
    customers.push(customer)
    console.log("Customer successfully created")
    console.log(showallcustomers())
  }  
  
  export function readcustomer(id){
    let customer = customers.find(customer=>customer.id==id)
    return customer
  }


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
        Create(customerName, id)
    }
    else
    {
        console.log("The id given is not valid")
    }
}

export function deleteCustomerById(id) {
    // Find the index of the customer with the given ID
    const index = customers.findIndex(customer => customer.number === id);

    // If customer with the given ID exists, remove it from the array
    if (index !== -1) {
        customers.splice(index, 1);
        console.log(`Customer with ID ${id} deleted successfully.`);
    } else {
        console.log(`Customer with ID ${id} not found.`);
    }
}


export function showallcustomers(){
    return customers
}

  export const customers=[]
 

