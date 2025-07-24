import axiosInstance from './axiosInstance';

export async function fetchBook() {
  const res = await axiosInstance.get('/books');
  return res.data;
}

export async function addBook(data: { book: string }) {
  const res = await axiosInstance.post('/books', data);
  return res.data;
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
  }

  return data;
}

export async function register(name: string, password: string) {
  const res = await axiosInstance.post('/auth/register', { name, password });
  return res.data;
}
