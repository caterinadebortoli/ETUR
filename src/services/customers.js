export default class Customer {
    constructor(name, number) {
      this.name = name;
      this.number = number;
    }
  }
  export function Create(){
  
    const customerName = "";
    const customerNumber = "";
  
    const question = prompt("Type in the Customer Name:", customerName);
    console.log(question);
    question = prompt("Type in the Customer Number:", customerNumber);
    console.log(question);
  
    const customer = new Customer(customerName,customerNumber)
    customers.push(customer)
  }  
  
  export function readcustomer(id){
    let customer = customers.find(customer=>customer.id==id)
    return customer
  }

  export const customers=[]
 

