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

  export const customers=[]
 

