const URL = "http://localhost:5000/api/auth";

interface LoginResponse{
    success:boolean,
    user?:{email:string},
    error?:string
}

interface UserRegisterData{
    firstName:string,
    lastName:string,
    email:string,
    password:string
}

export async function authAPI(email:string, password:string): Promise<LoginResponse>{
    const res = await fetch(`${URL}/login`, {
        method:"post",
        headers:{"Content-Type":"application/json"},
        credentials:"include",
        body:JSON.stringify({email, password})
    });

    const data = await res.json();
    console.log("await data",data);
    if(!res.ok){
        return {success:false, error:data.error || "Login failed"}
    }

    return{success:true, user:data};
}

export async function regAPI(firstName:string, lastName:string, email:string, password:string) {
    const res = await fetch(`${URL}/register`, {
        method:"post",
        headers:{"Content-Type": "application/json"},
        credentials:"include",
        body:JSON.stringify({firstName, lastName, email, password})
    });

    const data = await res.json()
    if(!res.ok){
        return {success:false, error:data.error || "Register failed"}
    }

    return {success:true, user:data}
}

export async function logoutAPI() {
  const res = await fetch(`${URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, error: data.error || "Something Wrong" };
  }

  return { success: true };
}