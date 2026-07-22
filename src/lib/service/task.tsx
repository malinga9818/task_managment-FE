const URL="http://localhost:5000/api/tasks";

interface TaskCreate{
    title:string,
    description:string,
    due_date:string,
    status:string,
    priority:string
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