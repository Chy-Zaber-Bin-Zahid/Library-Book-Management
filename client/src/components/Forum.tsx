import { useState } from "react";
import { addBook, deleteBook, fetchBook, updateBook } from "../api/apis";
import { useMyContext } from "../context/contextApi";

type Book = {
  id: number;
  book: string;
};

function Forum() {
    const { forum } = useMyContext();
    const [book, setBook] = useState<string>("");
    const [bookId, setBookId] = useState<string>("");
    const [allBooks, setAllBooks] = useState<Array<Book>>([]);
    console.log(allBooks)

    // useEffect(() => {
    // async function fetchData() {
    //     if (forum === "read") {
    //     const books = await fetchBook();
    //     setAllBooks(books.data);
    //     }
    // }

    // fetchData();
    // }, [forum]);

    async function handleClick() {
        if (forum === "add") {
            addBook({ book });                
        } else if (forum === "delete") {
            deleteBook(bookId);
        } else if (forum === "update") {
            updateBook(bookId, book);
        } else {
            const books = await fetchBook();
            setAllBooks(books.data);
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
                        onChange={(e) => setBookId(e.target.value)}
                    />
                ) : forum === "update" ? (
                    <div>
                        <input
                        type="text"
                        placeholder="Enter book id"
                        className="border p-2 rounded w-full mb-4"
                        required
                        onChange={(e) => setBookId(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Edit book name"
                        className="border p-2 rounded w-full mb-4"
                        required
                        onChange={(e) => setBook(e.target.value)}
                    />
                    </div>
                ) : (
                   <>
                    <p>List of all books will be displayed here.</p>
                    <div>
                        <ul className="list-disc pl-5">
                            {allBooks.map((b, index) => (
                                <li key={index} className="mb-2">{b.book}</li>
                            ))}
                        </ul>
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