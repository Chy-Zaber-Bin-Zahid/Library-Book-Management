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
            <form  onSubmit={(e) => {e.preventDefault(); handleClick();}} className={`bg-white p-8 rounded shadow-lg ${forum === "delete" ? "w-[400px]" : "w-[550px]"} flex flex-col items-center gap-4 relative`}>
                <button
                    type="button"
                    onClick={() => setModal(false)}
                    className="absolute top-2 right-4 text-gray-600 hover:text-black text-2xl font-bold cursor-pointer"
                    >
                    ×
                </button>
                <h1 className="text-2xl font-bold mb-4">{forum === "add" ? "Add Book" : forum === "delete" ? "" : forum === "update" ? "Update Book" : "Get All Book"}</h1>
                {forum === "add" ? (
                    <div className="space-y-6">
                        <div>
                        <label htmlFor="title" className="block text-gray-700 font-medium mb-3">
                            Book Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., The Great Gatsby"
                            required
                            onChange={(e) => setBook(e.target.value)}
                        />
                        </div>

                        <div>
                        <label htmlFor="author" className="block text-gray-700 font-medium mb-3">
                            Author
                        </label>
                        <input
                            type="text"
                            id="author"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., F. Scott Fitzgerald"
                        />
                        </div>

                        {/* ISBN and Publication Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="isbn" className="block text-gray-700 font-medium mb-3">
                            ISBN
                            </label>
                            <input
                            type="text"
                            id="isbn"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., 978-3-16-148410-0"
                            />
                        </div>
                        <div>
                            <label htmlFor="publicationDate" className="block text-gray-700 font-medium mb-3">
                            Publication Date
                            </label>
                            <div className="relative">
                            <input
                                type="date"
                                id="publicationDate"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                            />
                            </div>
                        </div>
                        </div>
                    </div>
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
                    <div className="w-full">
                    <div className="space-y-6 p-4">
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Id</label>
                            <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900"
                            value={id}
                            required
                            onChange={(e) => setBookId(e.target.value)}
                            placeholder="Id"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Title</label>
                            <input
                            type="text"
                            placeholder="The Midnight Library"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900"
                            required
                            onChange={(e) => setBook(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Author</label>
                            <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900"
                            placeholder="Author name"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">ISBN</label>
                            <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-900"
                            placeholder="ISBN"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-2">Publication Date</label>
                            <div className="relative">
                            <input
                                type="date"
                                id="publicationDate"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                            />
                            </div>
                        </div>
                    </div>
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