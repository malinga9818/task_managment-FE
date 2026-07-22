import { cookies } from "next/headers"

export const getCurrentUser = async() => {
    const token =  (await cookies()).get('token')?.value;
    console.log(token)
    if(!token) return null;

    try{
        const res = await fetch("http://localhost:5000/api/users/me", {
            headers:{Cookie:`token=${token}`}
        });
        console.log("res", res);
        if(!res.ok){
            return null
        }
        return await res.json();
    }
    catch {
        return null;
    }
}