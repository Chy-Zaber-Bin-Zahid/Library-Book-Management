"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../api/apis"
import { useToastStore } from "../store/toastStore"

function Login() {
  const [name, setName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigate = useNavigate()
  const { showToast } = useToastStore();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (name && password) {
      try {
        const store = await login(name, password)
        console.log(store);
        navigate("/")
        showToast("Login successful!", "success");
      } catch (error) {
        console.error("Login failed:", error)
        showToast("Login failed!", "error");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Welcome Back</h2>
          <p className="text-gray-500 text-lg">Sign in to access your account.</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >
          <div>
            <label htmlFor="username" className="block text-slate-700 font-medium mb-3 text-base">
              Username
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your username"
              type="text"
              id="username"
              name="username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-slate-700 font-medium mb-3 text-base">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
              type="password"
              id="password"
              name="password"
              required
            />
          </div>

          <button
            className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="submit"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500">
            {"Don't have an account? "}
          <Link to="/register" className="text-blue-500 hover:text-blue-600 font-medium">
            Sign up
          </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
