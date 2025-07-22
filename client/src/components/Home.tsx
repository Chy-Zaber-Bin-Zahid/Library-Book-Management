import { useMyContext } from "../context/contextApi";
import { useEffect, useState } from "react";
import { fetchBook } from "../api/apis";
import Forum from "./Forum";

type Book = {
  id: number;
  book: string;
};

function Home() {
  const { setForum } = useMyContext();
  const [allBooks, setAllBooks] = useState<Array<Book>>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [id, setId] = useState<number>(0)

  async function fetchData() {
    const books = await fetchBook();
    setAllBooks(books.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (type: string, id: number = 0) => {
    setForum(type);
    setId(id)
    setModal(true);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 relative">
    {modal && (
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50">
         <Forum setModal = {setModal} refetch={fetchData} id = {id} />
      </div>
    )}
      <h1 className="text-4xl font-bold mb-4">Library Book Management</h1>
      <p>List of all books will be displayed here.</p>
      <div className="w-[400px] h-[400px] bg-gray-100 flex flex-col items-start justify-start rounded-lg shadow-lg p-4 overflow-y-auto">
       <table className="table-auto w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2 text-left">ID</th>
            <th className="border px-4 py-2 text-left">Book Name</th>
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allBooks.map((b, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border px-4 py-2 text-center">{b.id}</td>
              <td className="border px-4 py-2">{b.book}</td>
              <td className="border px-4 py-2">
                <div className="flex justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleClick("delete", b.id)}
                    className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded text-sm transition hover:bg-red-600 hover:-translate-y-[2px]"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => handleClick("update", b.id)}
                    className="bg-yellow-500 cursor-pointer text-white px-3 py-1 rounded text-sm transition hover:bg-yellow-600 hover:-translate-y-[2px]"
                  >
                    Update
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      </div>
      <div className="flex gap-4 mt-4">
        <button
        type="button"
        onClick={() => handleClick("add")}
        className="bg-green-500 text-white px-4 py-2 rounded w-[100px] text-center cursor-pointer transition hover:bg-green-600 delay-200 hover:-translate-y-1"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default Home;
