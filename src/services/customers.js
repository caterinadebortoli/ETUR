export default class Customer {
    constructor(name, number) {
      this.name = name;
      this.number = number;
    }
  }

  export const customers=[]

  export function Create(customerName, customerNumber){
    const customer = new Customer(customerName,customerNumber)
    customers.push(customer)
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