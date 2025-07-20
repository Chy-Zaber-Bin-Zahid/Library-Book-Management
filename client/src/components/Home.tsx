import { useNavigate } from "react-router-dom";
import { useMyContext } from "../context/contextApi";

function Home() {
  const { setForum } = useMyContext();
  const navigate = useNavigate();

  const handleClick = (type: string, path: string) => {
    setForum(type);
    navigate(path);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center gap-4">
      <button
        onClick={() => handleClick("add", "/add")}
        className="bg-green-500 text-white px-4 py-2 rounded w-[100px] text-center cursor-pointer transition hover:bg-green-600 delay-200 hover:-translate-y-1"
      >
        Add
      </button>
      <button
        onClick={() => handleClick("delete", "/delete")}
        className="bg-red-500 text-white px-4 py-2 rounded w-[100px] text-center cursor-pointer transition hover:bg-red-600 delay-200 hover:-translate-y-1"
      >
        Delete
      </button>
      <button
        onClick={() => handleClick("update", "/update")}
        className="bg-yellow-500 text-white px-4 py-2 rounded w-[100px] text-center cursor-pointer transition hover:bg-yellow-600 delay-200 hover:-translate-y-1"
      >
        Update
      </button>
      <button
        onClick={() => handleClick("read", "/read")}
        className="bg-blue-500 text-white px-4 py-2 rounded w-[100px] text-center cursor-pointer transition hover:bg-blue-600 delay-200 hover:-translate-y-1"
      >
        Read
      </button>
    </div>
  );
}

export default Home;
