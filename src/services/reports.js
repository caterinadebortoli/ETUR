import Fastify from 'fastify'
  
const fastify = Fastify({
  logger:true
})

export class Comment{
    constructor(author, message, createdAt, type){
        this.author=author,
        this.message=message,
        this.createdAt=createdAt,
        this.type=type
    }}

export default class Report {
    constructor(
      Id,
      category,
      customerId,
      description,
      labels,
      owner,
      assignedTo,
      createdAt,
      editedAt,
      closedAt,
      state,
      priority,
      closeReason,
      references
    ) {
      this.Id = Id;
      this.category = category;
      this.customerId = customerId;
      this.description = description;
      this.labels = labels;
      this.owner = owner;
      this.assignedTo = assignedTo;
      this.createdAt = createdAt;
      this.editedAt = editedAt;
      this.closedAt = closedAt;
      this.state = state;
      this.priority = priority;
      this.comments = [];
      this.closeReason = closeReason || undefined;
      this.references = references;
    }
    
    
  }
  export const reports=[]

  export function validate_id(Id){
    return reports.some(report=>report.Id===Id)
  }
  export function Customer_CreateReport(Id, category, customerId, description){
    
      if(!validate_id(Id)){
      let report = new Report(Id,category,customerId, description); 
      reports.push(report);}
      else{
        throw new Error("The Id is not valid")
      }
    }

  export function Customer_ShowReports(customerId){
    return reports.find(report=>report.customerId===customerId);
    
  }
  export function CustomerComment(Id,author, message, type){
        
    
  var currentdate = new Date(); 
  var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    let comment=new Comment(author,message,datetime, type);
    let report= reports.find(r=>r.Id===Id);
    if (!report) {
        throw new Error("Report not found for the given Id");
    }

    report.comments.push(comment);
}
export function Customer_CloseReport(Id, closeReason = "No reason provided"){
  let report =reports.find(report=>report.Id===Id);
  report.state="Closed";
  var currentdate = new Date(); 
  var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  report.closedAt=datetime
  report.closeReason = closeReason;
}
export function showClosedReports(customerId)
{
  return reports.find(report=>report.customerId===customerId && report.state==="Closed")
}
export function Customer_FilterReportByState(customerId,state){
  let report = reports.filter(report=>report.state===state && report.customerId===customerId);
  return report;
}
    export function Pm_ModifyReport(Id, priority, state){
        let report = reports.find(report=>report.Id===Id);
        report.priority = priority;
        report.state = state;
        
      }

    export function Pm_ShowReports(){
        return reports;
    }

    export function Pm_AssignReportTo(Id, assignedTo){
        let report = reports.find(report=>report.Id===Id);
        report.assignedTo = assignedTo;
    }

    
    export function Pm_FilterReportByCategory(category){
        let report = reports.filter(report=>report.category===category);
        return report;
    }
    export function Pm_FilterReportByCustomerId(customerId){
        let report = reports.filter(report=>report.customerId===customerId);
        return report;
    }
    export function Pm_FilterReportByState(state){
        let report = reports.filter(report=>report.state===state);
        return report;
    }

    export function Dev_ShowReports(developer){
        let report = reports.find(report=>report.assignedTo === developer);
        return report 
    }

    export function Dev_ModifyReport(Id, state, closeReason){
        let report =reports.find(report=>report.Id===Id);
        report.state=state;
        report.closeReason = closeReason;
    }

  export async function customerReportsRoutes(fastify, options) {
    fastify.get("/customer/reports", async (request, reply) => {
      
        return Customer_ShowReports(request.query.Id);
        
    });
    fastify.get("/customer/reports/closed",async(request,reply)=>{
      return showClosedReports(request.body.customerId)
    });

    fastify.post("/customer/report", async (request, reply) => {
      try{
        Customer_CreateReport(request.body.Id, request.body.category, request.body.customerId, request.body.description)
        reply.code(201).send('Report successfully created')
      }
      catch(err){
        reply.code(500).send(err)
      }
      });
      fastify.post("/customer/report/comments", async (request,reply)=>{
        CustomerComment(request.body.Id,request.body.author,request.body.message,request.body.type)  
      }) 
      fastify.put("/customer/report",async(request,reply)=>{
        if(request.body.closeReason===undefined){
        Customer_CloseReport(request.body.Id)}
        else{
          Customer_CloseReport(request.body.Id, request.body.closeReason)
        }
      })
      fastify.get("/customer/reports/state",async(request,reply)=>{
        return Customer_FilterReportByState(request.body.customerId,request.body.state)
      })

    
}
export async function pmReportsRoutes(fastify, options){
    fastify.get("/pm/reports", async (request, reply) => {
        return Pm_ShowReports();
      });

      fastify.put("/pm/report", async (request,reply)=>{
        Pm_ModifyReport(request.body.Id,request.body.priority,request.body.state)  
      })

      fastify.put("/pm/report/assign", async (request,reply)=>{
        Pm_AssignReportTo(request.body.Id,request.body.assignedTo)  
      }) 

      fastify.post("/pm/report/comments", async (request,reply)=>{
        Comment(request.body.Id,request.body.author,request.body.message,request.body.createdAt,request.body.type)  
      }) 

      fastify.get("/pm/reports/category/", async(request,reply)=>{
        Pm_FilterReportByCategory(request.body.category)
      })

      fastify.get("/pm/reports/customerId",async(request,reply)=>{
        Pm_FilterReportByCustomerId(request.body.customerId)
      })
      fastify.get("/pm/reports/state",async(request,reply)=>{
        Pm_FilterReportByState(request.body.state)
      })
      

}
export async function devReportsRoutes(fastify,options){
  fastify.get("/dev/reports",async(request,reply)=>{
      return Dev_ShowReports(request.query.developer)
  })
  fastify.put("/dev/report",async(request,reply)=>{
      Dev_ModifyReport(request.body.Id,request.body.state,request.body.closeReason)
  })
}