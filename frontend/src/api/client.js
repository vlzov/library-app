import axios from 'axios';
import { mockApi } from './mock';
import { notify } from '../components/ToastContext';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 4000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (r) => r,
  (error) => {
    const data = error.response?.data;
    let message = 'Unexpected error';
    if (data?.fields) {
      message = Object.entries(data.fields)
        .map(([f, m]) => `${f}: ${m}`)
        .join('\n');
    } else if (data?.message) {
      message = `${data.code ?? 'ERROR'}: ${data.message}`;
    } else if (error.code === 'ERR_NETWORK') {
      message = 'Network error — switching to offline demo mode';
    }
    notify(message, 'error');
    return Promise.reject(error);
  }
);

const mockRoutes = [
  [/^\/authors$/, 'GET',    () => mockApi.getAuthors()],
  [/^\/authors$/, 'POST',   (_, body) => mockApi.createAuthor(body)],
  [/^\/authors\/(\d+)$/, 'GET',    (m) => mockApi.getAuthor(m[1])],
  [/^\/authors\/(\d+)$/, 'PUT',    (m, body) => mockApi.updateAuthor(m[1], body)],
  [/^\/authors\/(\d+)$/, 'DELETE', (m) => mockApi.deleteAuthor(m[1])],
  [/^\/books$/, 'GET',    () => mockApi.getBooks()],
  [/^\/books$/, 'POST',   (_, body) => mockApi.createBook(body)],
  [/^\/books\/(\d+)$/, 'GET',    (m) => mockApi.getBook(m[1])],
  [/^\/books\/(\d+)$/, 'PUT',    (m, body) => mockApi.updateBook(m[1], body)],
  [/^\/books\/(\d+)$/, 'DELETE', (m) => mockApi.deleteBook(m[1])],
  [/^\/books\/by-author\/(\d+)$/, 'GET', (m) => mockApi.getBooksByAuthor(m[1])],
];

async function callMock(method, url, body) {
  const path = url.replace(/^\/api/, '').split('?')[0];
  for (const [re, m, fn] of mockRoutes) {
    if (m !== method) continue;
    const match = path.match(re);
    if (match) return { data: await fn(match, body) };
  }
  throw new Error(`Mock has no route for ${method} ${path}`);
}

const originalGet    = api.get.bind(api);
const originalPost   = api.post.bind(api);
const originalPut    = api.put.bind(api);
const originalDelete = api.delete.bind(api);

const wrap = (original, method) => async (url, body) => {
  if (USE_MOCK) return callMock(method, url, body);
  try {
    return await original(url, body);
  } catch (e) {
    if (e.code === 'ERR_NETWORK' || e.code === 'ECONNABORTED') {
      console.info(`[api] backend unavailable, using mock for ${method} ${url}`);
      return callMock(method, url, body);
    }
    throw e;
  }
};

api.get    = wrap(originalGet, 'GET');
api.post   = wrap(originalPost, 'POST');
api.put    = wrap(originalPut, 'PUT');
api.delete = wrap(originalDelete, 'DELETE');

export default api;