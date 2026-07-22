"use client";


import { regAPI } from "@/lib/service/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const router = useRouter()

  async function RegisterHandle(){
    const result = await regAPI(firstName, lastName, email, password);
    if(result.success){
      console.log("Register Success: ", result.user)
      router.push("/login");
    }

    else{
      setError("Registration Failed")
    }
  }

  return(
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6">Register</h1>


      <input
        onChange={(e) => setFirstName(e.target.value)}
        type="firt name"
        placeholder="first name"
        className="w-full border rounded p-2 mb-4" 
      />
      
      <input
        onChange={(e) => setLastName(e.target.value)}
        type="last name"
        placeholder="last name"
        className="w-full border rounded p-2 mb-4" 
      />

      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        className="w-full border rounded p-2 mb-4"
      />


     <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="w-full border rounded p-2 mb-6"
      />

      <button onClick={RegisterHandle} className="w-full hover:bg-sky-700 bg-sky-500 text-white rounded p-2">
        Submit
      </button>
    </div> 
    );    
}