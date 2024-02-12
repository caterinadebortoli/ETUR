export default class Customer {
    constructor(name, number) {
      this.name = name;
      this.number = number;
    }
  }
  export function Create(){
    const readline = require("readline");
  
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    const customerName = "";
    const customerNumber = "";
  
    rl.question("Type in the Customer Name:", function (string) {
      customerName = string;
      rl.close();
    });
    rl.question("Type in the Customer Nummber:", function (string){
      customerNumber = string;
      rl.close();
    })
  
    const customer = new Customer(customerName,customerNumber)
    customers.push(customer)
  }  
  
  export function readcustomer(id){
    let customer = customers.find(customer=>customer.id==id)
    return customer
  }


  export const customers=[]
 

