"use client"

import { useMyContext } from "../context/contextApi"
import { useEffect, useState } from "react"
import { fetchBook } from "../api/apis"
import Forum from "./Forum"
import { Search, Edit, Trash2 } from "lucide-react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import Card from "./Card"

type BookType = {
  id: number
  book: string
}

function Home() {
  const { setForum } = useMyContext()
  const [allBooks, setAllBooks] = useState<Array<BookType>>([])
  const [modal, setModal] = useState<boolean>(false)
  const [id, setId] = useState<number>(0)

  async function fetchData() {
    const books = await fetchBook()
    setAllBooks(books.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleClick = (type: string, id = 0) => {
    setForum(type)
    setId(id)
    setModal(true)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {modal && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-100 bg-opacity-50">
          <Forum setModal={setModal} refetch={fetchData} id={id} />
        </div>
      )}
      
      <Sidebar/>

      <div className="flex-1 flex flex-col">
        <Header/>

        <main className="flex-1 p-8 overflow-auto">
          <Card/>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Book List</h2>
                <button
                  type="button"
                  onClick={() => handleClick("add")}
                  className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Add Book
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search books by title, author, or ISBN"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Title</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Author</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">ISBN</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allBooks.map((b, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span className="text-blue-600 font-medium">{b.book}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">Zaber</td>
                      <td className="px-6 py-4 text-gray-600">978-{b.id.toString().padStart(9, "0")}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Available
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleClick("update", b.id)}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleClick("delete", b.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home
