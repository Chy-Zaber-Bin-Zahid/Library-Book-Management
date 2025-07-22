import { useState } from "react";
import { addBook, deleteBook, updateBook } from "../api/apis";
import { useMyContext } from "../context/contextApi";

function Forum( { setModal, refetch, id }: { setModal: (value: boolean) => void; refetch: () => void; id: number}) {
    const { forum } = useMyContext();
    const [book, setBook] = useState<string>("");
    const [bookId, setBookId] = useState<string>(String(id));

    function handleClick() {
        if (forum === "add" && book.length > 0) {
            console.log("Adding book:", book.length);
            addBook({ book }); 
            setModal(false);
            refetch();               
        } else if (forum === "delete" && bookId.length > 0) {
            deleteBook(bookId);
            setModal(false);
            refetch();
        } else if (forum === "update" && book.length > 0 && bookId .length > 0) {
            updateBook(bookId, book);
            setModal(false);
            refetch();
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <form  onSubmit={(e) => {e.preventDefault(); handleClick();}} className="bg-white p-8 rounded shadow-lg w-[400px] flex flex-col items-center gap-4 relative">
                <button
                    type="button"
                    onClick={() => setModal(false)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold cursor-pointer"
                    >
                    ×
                </button>
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
                        value={id}
                        required
                        onChange={(e) => setBookId(e.target.value)}
                    />
                ) : forum === "update" ? (
                    <div>
                        <input
                        type="text"
                        placeholder="Enter book id"
                        className="border p-2 rounded w-full mb-4"
                        value={id}
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
                ) : null}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer transition hover:bg-blue-600 delay-200">
                    {forum === "add" ? "Submit" : forum === "delete" ? "Delete" : forum === "update" ? "Update" : "Fetch Books" }
                </button>
            </form>
        </div>
    )
}

export default Forum