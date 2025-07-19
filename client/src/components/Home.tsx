import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center gap-4">
      <Link to="/add" className="bg-green-500 text-white px-4 py-2 rounded w-[100px] text-center cursor-pointer transition hover:bg-green-600 delay-200 hover:-translate-y-1">
        Add
      </Link>
      <Link to="/delete" className="bg-red-500 text-white px-4 py-2 rounded w-[100px] text-center cursor-pointer transition hover:bg-red-600 delay-200 hover:-translate-y-1">
        Delete
      </Link>
      <Link to="/update" className="bg-yellow-500 text-white px-4 py-2 rounded w-[100px] text-center cursor-pointer transition hover:bg-yellow-600 delay-200 hover:-translate-y-1">
        Update
      </Link>
      <Link to="/read" className="bg-blue-500 text-white px-4 py-2 rounded w-[100px] text-center cursor-pointer transition hover:bg-blue-600 delay-200 hover:-translate-y-1">
        Read
      </Link>
    </div>
  );
}

export default Home;
