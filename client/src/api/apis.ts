import axiosInstance from './axiosInstance';

export async function fetchBook() {
  const res = await axiosInstance.get('/books');
  return res.data;
}

export async function addBook(book: string, userId: number ) {
  try {
    const res = await axiosInstance.post(`/books/${userId}`, {
      book: book,
    });
    console.log(res)
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function deleteBook(id: string) {
  const res = await axiosInstance.delete(`/books/${id}`);
  return res.data;
}

export async function updateBook(id: string, book: string) {
  const res = await axiosInstance.put(`/books/${id}`, { book });
  return res.data;
}

export async function login(name: string, password: string) {
  const res = await axiosInstance.post('/auth/login', { name, password });
  const data = res.data;

  if (data.access_token) {
    localStorage.setItem('token', data.access_token);
  } else {
      throw new Error('Invalid credentials provided.');
    }

  return data;
}

export async function register(name: string, password: string) {
  const res = await axiosInstance.post('/auth/register', { name, password });
  return res.data;
}
