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

<<<<<<< HEAD
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
=======

>>>>>>> 9447ef751f5ccfaa8ab2f7a32feb69ff2c4d7428
  export const customers=[]
 

