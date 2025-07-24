import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { register } from "../api/apis";
import { useToastStore } from "../store/toastStore";

function Register() {
  const [fullName, setFullName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const navigate = useNavigate();
  const { showToast } = useToastStore();

  async function handleSubmit (e: React.FormEvent) {
    e.preventDefault()
    if (fullName && password) {
      try {
        await register(fullName, password)
        navigate("/login")
        showToast("Register successful!", "success");
      } catch (error) {
        console.error("Register failed:", error)
        showToast("Register failed!", "error");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-3">Create Your Account</h1>
          <p className="text-gray-500 text-lg">Join BookWise to manage your library books with ease.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-slate-700 font-medium mb-3 text-base">
              Username
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-slate-700 font-medium mb-3 text-base">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
