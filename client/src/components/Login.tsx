import { useState } from "react";
import { login } from "../api/apis";
import { useNavigate } from "react-router-dom";

function Login() {
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();


  async function handleLogin() {
    if (name && password) {
      try {
        await login(name, password);
        navigate("/");
      } catch (error) {
        console.error("Login failed:", error);
        alert("Invalid credentials");
      }
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center bg-gray-200 p-8 rounded-lg shadow-md w-96">
            <h2 className="text-3xl">Login Forum</h2>
            <form onSubmit={(e) => {e.preventDefault(); handleLogin();}} className="flex flex-col gap-4 items-center">
                <div className="flex flex-col mt-4 gap-4">
                <label htmlFor="username">Username:</label>
                <input onChange={(e) => setName(e.target.value)} className="bg-amber-50 px-4 py-2 rounded" placeholder="Name" type="text" id="username" name="username" required />
                </div>
                <div className="flex flex-col gap-4">
                <label htmlFor="password">Password:</label>
                <input onChange={(e) => setPassword(e.target.value)} className="bg-amber-50 px-4 py-2 rounded" placeholder="Password" type="password" id="password" name="password" required />
                </div>
                <button className="bg-black text-white px-4 py-2 rounded w-[100px] text-center cursor-pointer transition hover:bg-gray-600 delay-200 hover:-translate-y-1" type="submit">Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login