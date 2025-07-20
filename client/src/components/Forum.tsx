import { useState } from "react";
import { addBook, deleteBook, fetchBook, updateBook } from "../api/apis";
import { useMyContext } from "../context/contextApi";

function Forum() {
    const { forum } = useMyContext();
    const [book, setBook] = useState<string>("");
    const [allBooks, setAllBooks] = useState<string[]>([]);

    async function handleClick() {
        if (forum === "add") {
            addBook({ name: book });                
        } else if (forum === "delete") {
            deleteBook(book);
        } else if (forum === "update") {
            updateBook(book);
        } else {
            const books = await fetchBook();
            setAllBooks(books);
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg w-[400px] flex flex-col items-center gap-4">
                <h1 className="text-2xl font-bold mb-4">{forum === "add" ? "Add Book" : forum === "delete" ? "Delete Book" : forum === "update" ? "Update Book" : "Get All Book"}</h1>
                {forum === "add" ? (
                    <input
                        type="text"
                        placeholder="Enter book title"
                        className="border p-2 rounded w-full mb-4"
                        required
                        onChange={(e) => setBook(e.target.value)}
                    />
                ) : forum === "delete" ? (
                    <input
                        type="text"
                        placeholder="Enter book id"
                        className="border p-2 rounded w-full mb-4"
                        required
                        onChange={(e) => setBook(e.target.value)}
                    />
                ) : forum === "update" ? (
                    <input
                        type="text"
                        placeholder="Enter book id"
                        className="border p-2 rounded w-full mb-4"
                        required
                        onChange={(e) => setBook(e.target.value)}
                    />
                ) : (
                   <>
                    <p>List of all books will be displayed here.</p>
                    <div>
                        {allBooks.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {allBooks.map((b, index) => (
                                    <li key={index} className="mb-2">{b}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No books available.</p>
                        )}
                    </div>
                   </>
                )}
                <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer transition hover:bg-blue-600 delay-200">
                    {forum === "add" ? "Submit" : forum === "delete" ? "Delete" : forum === "update" ? "Update" : "Fetch Books" }
                </button>
            </div>
        </div>
    )
}

export default Forum