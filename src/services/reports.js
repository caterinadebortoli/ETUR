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
      comments,
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
      this.comments = comments;
      this.closeReason = closeReason;
      this.references = references;
    }
    
    
  }
  export const reports=[]

  export function Customer_CreateReport(Id, category, customerId, description){
    
      let report = new Report(Id,category,customerId, description); 
      reports.push(report);
    }

  export function Customer_ShowReports(customerId){
    let report = reports.find(report.customerId===customerId);
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

    export function Pm_Comment(Id,author, message, createdAt,type){
        
        let comment=new Comment(author,message,createdAt, type);
        let report=reports.find(report=>report.Id===Id);
        report.comments.push(comment);
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
    }

    export function Dev_ModifyReport(Id, state, closeReason){
        let report =reports.find(report=>report.Id===Id);
        report.state=state;
        report.closeReason = closeReason;
    }

  export async function customerReportsRoutes(fastify, options) {
    fastify.get("/customer/reports/:Id", async (request, reply) => {
      return Customer_ShowReports(request.params.Id);
    });
  
    fastify.post("/customer/report", async (request, reply) => {
      Customer_CreateReport(request.body.Id, request.body.category, request.body.customerId, request.body.description)
    });

    
}
export async function pmReportsRoutes(fastify, options){
    fastify.get("/pm/reports", async (request, reply) => {
        return Pm_ShowReports();
      });

      fastify.put("/pm/report/:Id", async (request,reply)=>{
        Pm_ModifyReport(request.params.Id,request.body.priority,request.body.state)  
      })

      fastify.put("/pm/report/:Id", async (request,reply)=>{
        Pm_AssignReportTo(request.params.Id,request.body.assignedTo)  
      }) 

      fastify.post("/pm/report/:Id/Comments", async (request,reply)=>{
        Pm_Comment(request.params.Id,request.body.author,request.body.message,request.body.createdAt,request.body.type)  
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
      return Dev_ShowReports(request.body.developer)
  })
  fastify.put("/dev/report/:Id",async(request,reply)=>{
      Dev_ModifyReport(request.params.Id,request.body.state,request.body.closeReason)
  })
}