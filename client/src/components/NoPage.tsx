import { Link } from "react-router-dom"

function NoPage() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 bg-amber-100">
        <p className="text-6xl" >404</p>
        <Link className="bg-black text-white px-4 py-2 rounded cursor-pointer transition hover:bg-white hover:text-black delay-200" to="/">Go back to Home</Link>
    </div>
  )
}

export default NoPage