
export default function LoginSection (){
    return(
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="w-full border rounded p-2 mb-4"
      />

     <input
        type="password"
        placeholder="Password"
        className="w-full border rounded p-2 mb-6"
      />

      <button className="w-full hover:bg-sky-700 bg-sky-500 text-white rounded p-2">
        Login
      </button>

      <h6 className="text-gray-600 flex items-center justify-center ">
             No account? <button className="text-teal-500">Register</button>
      </h6>
    </div>
    )    
}