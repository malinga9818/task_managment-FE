const URL = "http://localhost:5000/api/auth";

interface LoginResponse{
    success:boolean,
    user?:{email:string},
    error?:string
}

export async function authAPI(email:string, password:string): Promise<LoginResponse>{
    const response = await fetch(`${URL}/login`, {
        method:"post",
        headers:{"Content-Type":"application/json"},
        credentials:"include",
        body:JSON.stringify({email, password})
    });

    const data = await response.json();
    console.log("await data",data);
    if(!response.ok){
        return {success:false, error:data.error || "Login failed"}
    }

    return{success:true, user:data};
}