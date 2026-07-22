"use client";

import { authAPI } from "@/lib/service/auth";
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function LoginSection (){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [register, setRegister] =useState(false);
  
  const router = useRouter();

  async function LoginHandle() {
    setError(null);

    const result = await authAPI(email, password);
    if (result.success){
      console.log("Login success!", result.user);

      router.push("/overview");
    }
    else{
      setError("Invalid email or password");
    }

  }

  if (register){
    router.push("/register");
  }
  
  return(
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

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

      <button onClick={LoginHandle} className="w-full hover:bg-sky-700 bg-sky-500 text-white rounded p-2">
        Login
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <h6 className="text-gray-600 flex items-center justify-center ">
             No account? <button onClick={() => setRegister(true)} className="text-teal-500 ">Register</button>
      </h6>
    </div>
    )    
}