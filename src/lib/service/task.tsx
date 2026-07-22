const URL="http://localhost:5000/api/tasks";
import { Task } from "@/app/(protected)/task/page";

interface TaskCreate{
    title:string,
    description:string,
    due_date:string,
    status:string,
    priority:string
}

export interface AnalyticsData {
  statusDistribution: {
    todo: number;
    inprogress: number;
    completed: number;
  };
  priorityDistribution: {
    high: number;
    medium: number;
    low: number;
  };
  summeryCard: {
    totalActive: number;
    completedToday: number;
    overdue: number;
  };
}

export async function taskCreateAPI({title, description, due_date, status, priority}:TaskCreate) {
    const res = await fetch(`${URL}`, {
        method:"post",
        headers:{"Content-Type": "application/json"},
        credentials:"include",
        body:JSON.stringify({title, description, due_date, status, priority})
    });

    const data = await res.json()
    if(!res.ok){
        return {success:false, error:data.error || "Register failed"}
    }

    return {success:true, user:data}
}

export async function taskListAPI(){
 const res = await fetch(`${URL}`, {
    credentials:"include",
    method:"get"
 });

 const data = await res.json();
 console.log("fetching data: ",data)
 if (!res.ok){
    return {success:false, error:data.error || "Something Wrong"} 
 }

 return{success:true, task:data}

}


export async function taskDeleteAPI(id: string) {
  const res = await fetch(`${URL}/${id}`, {
    method: "DELETE",
    credentials: "include", 
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, error: data.error || "Something Wrong" };
  }

  return { success: true };
}


export async function taskUpdateAPI(id: string, task: Partial<Task>) {
  const res = await fetch(`${URL}/${id}`, {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", 
    body: JSON.stringify(task),
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, error: data.error || "Something Wrong" };
  }

  return { success: true, task: data };
}


export async function analyticsAPI() {
  const res = await fetch(`${URL}/summery-card`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();
  console.log("analytic data",data);

  if (!res.ok) {
    return { success: false, error: data.error || "Something Wrong" };
  }

  return { success: true, data: data as AnalyticsData };
}