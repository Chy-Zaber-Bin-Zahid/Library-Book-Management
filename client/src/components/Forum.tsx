import { useState } from "react";
import { addBook, deleteBook, updateBook } from "../api/apis";
import { useMyContext } from "../context/contextApi";
import { AlertTriangle } from "lucide-react"

function Forum( { setModal, refetch, id }: { setModal: (value: boolean) => void; refetch: () => void; id: number}) {
    const { forum } = useMyContext();
    const [book, setBook] = useState<string>("");
    const [bookId, setBookId] = useState<string>(String(id));

    async function handleClick() {
        if (forum === "add" && book.length > 0) {
            await addBook({ book });             
        } else if (forum === "delete" && bookId.length > 0) {
            await deleteBook(bookId);
        } else if (forum === "update" && book.length > 0 && bookId .length > 0) {
            await updateBook(bookId, book);
        }
        refetch();
        setModal(false);
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <form  onSubmit={(e) => {e.preventDefault(); handleClick();}} className="bg-white p-8 rounded shadow-lg w-[400px] flex flex-col items-center gap-4 relative">
                <button
                    type="button"
                    onClick={() => setModal(false)}
                    className="absolute top-2 right-4 text-gray-600 hover:text-black text-2xl font-bold cursor-pointer"
                    >
                    ×
                </button>
                <h1 className="text-2xl font-bold mb-4">{forum === "add" ? "Add Book" : forum === "delete" ? "" : forum === "update" ? "Update Book" : "Get All Book"}</h1>
                {forum === "add" ? (
                    <input
                        type="text"
                        placeholder="Enter book title"
                        className="border p-2 rounded w-full mb-4"
                        required
                        onChange={(e) => setBook(e.target.value)}
                    />
                ) : forum === "delete" ? (
                        <div>
                             <input
                                type="text"
                                placeholder="Enter book id"
                                className="border p-2 rounded w-full mb-4 hidden"
                                value={id}
                                required
                                onChange={(e) => setBookId(e.target.value)}
                            />
                            <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <AlertTriangle className="w-8 h-8 text-red-500" />
                            </div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Confirm Deletion</h2>
                            <p className="text-gray-600 text-center mb-4 leading-relaxed">
                            Are you sure you want to delete the book?
                            This action cannot be undone.
                            </p>
                        </div>
                
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
                <button type="submit" className={`${forum === "delete" ? "bg-red-500" : "bg-blue-500"} text-white px-4 py-2 rounded cursor-pointer transition ${forum === "delete" ? "hover:bg-red-600" : "hover:bg-blue-600"} delay-200`}>
                    {forum === "add" ? "Submit" : forum === "delete" ? "Delete" : forum === "update" ? "Update" : "Fetch Books" }
                </button>
            </form>
        </div>
    )
}

export default Forum