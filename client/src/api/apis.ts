const API_URL = import.meta.env.VITE_API_URL;

export async function fetchBook() {
  const res = await fetch(`${API_URL}/books`);
  if (!res.ok) throw new Error("Failed to fetch books");
  return await res.json();
}

export async function addBook(data: { book: string; }) {
  const res = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add book");
  return await res.json();
}

export async function deleteBook(id: string) {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete book");
  return await res.json();
}

export async function updateBook(id: string, book: string) {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ book }),
  });
  if (!res.ok) throw new Error("Failed to update book");
  return await res.json();
}