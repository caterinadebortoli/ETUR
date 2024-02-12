export default class Customer {
    constructor(name, number) {
      this.name = name;
      this.number = number;
    }
  }
  export function Create(customerName, customerNumber){
    const customer = new Customer(customerName,customerNumber)
    customers.push(customer)
  }  
  
  export function readcustomer(id){
    let customer = customers.find(customer=>customer.number==id)
    return customer
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




  export const customers=[]
 

