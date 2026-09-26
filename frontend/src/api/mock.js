const delay = (ms = 250) => new Promise(r => setTimeout(r, ms));

let authors = [
  { id: 1, name: 'George Orwell', country: 'UK' },
  { id: 2, name: 'Ernest Hemingway', country: 'USA' },
  { id: 3, name: 'Mikhail Bulgakov', country: 'Russia' },
];

let books = [
  { id: 1, title: '1984', publishedYear: 1949, authorId: 1 },
  { id: 2, title: 'Animal Farm', publishedYear: 1945, authorId: 1 },
  { id: 3, title: 'The Old Man and the Sea', publishedYear: 1952, authorId: 2 },
  { id: 4, title: 'The Master and Margarita', publishedYear: 1967, authorId: 3 },
];

let nextAuthorId = 4;
let nextBookId = 5;

const apiError = (status, code, message, fields) => {
  const err = new Error(message);
  err.response = { status, data: { code, message, ...(fields ? { fields } : {}) } };
  return err;
};

const decorateBook = (b) => ({
  ...b,
  authorName: authors.find(a => a.id === b.authorId)?.name ?? 'Unknown',
});

const decorateAuthor = (a) => ({
  ...a,
  booksCount: books.filter(b => b.authorId === a.id).length,
});

export const mockApi = {
  async getAuthors() {
    await delay();
    return authors.map(decorateAuthor);
  },
  async getAuthor(id) {
    await delay();
    const a = authors.find(x => x.id === Number(id));
    if (!a) throw apiError(404, 'AUTHOR_NOT_FOUND', 'Автор не найден', { authorId: Number(id) });
    return decorateAuthor(a);
  },
  async createAuthor(data) {
    await delay();
    const fields = {};
    if (!data.name?.trim()) fields.name = 'Name is required';
    if (authors.some(a => a.name.toLowerCase() === data.name?.trim().toLowerCase()))
      fields.name = 'Author with this name already exists';
    if (Object.keys(fields).length)
      throw apiError(400, 'VALIDATION_ERROR', 'Ошибка валидации', fields);

    const author = {
      id: nextAuthorId++,
      name: data.name.trim(),
      country: data.country?.trim() || '',
    };
    authors.push(author);
    return decorateAuthor(author);
  },
  async updateAuthor(id, data) {
    await delay();
    const a = authors.find(x => x.id === Number(id));
    if (!a) throw apiError(404, 'AUTHOR_NOT_FOUND', 'Автор не найден', { authorId: Number(id) });
    Object.assign(a, data);
    return decorateAuthor(a);
  },
  async deleteAuthor(id) {
    await delay();
    const idx = authors.findIndex(x => x.id === Number(id));
    if (idx === -1) throw apiError(404, 'AUTHOR_NOT_FOUND', 'Автор не найден', { authorId: Number(id) });
    if (books.some(b => b.authorId === Number(id)))
      throw apiError(400, 'AUTHOR_HAS_BOOKS', 'Нельзя удалить автора с существующими книгами', { authorId: Number(id) });
    authors.splice(idx, 1);
    return { ok: true };
  },

  async getBooks() {
    await delay();
    return books.map(decorateBook);
  },
  async getBook(id) {
    await delay();
    const b = books.find(x => x.id === Number(id));
    if (!b) throw apiError(404, 'BOOK_NOT_FOUND', 'Книга не найдена', { bookId: Number(id) });
    return decorateBook(b);
  },
  async getBooksByAuthor(authorId) {
    await delay();
    return books.filter(b => b.authorId === Number(authorId)).map(decorateBook);
  },
  async createBook(data) {
    await delay();
    const fields = {};
    if (!data.title?.trim()) fields.title = 'Title is required';
    if (!data.authorId) fields.authorId = 'Author is required';
    if (data.publishedYear != null &&
        (data.publishedYear < 0 || data.publishedYear > new Date().getFullYear() + 1))
      fields.publishedYear = 'Invalid year';
    if (Object.keys(fields).length)
      throw apiError(400, 'VALIDATION_ERROR', 'Ошибка валидации', fields);

    const book = {
      id: nextBookId++,
      title: data.title.trim(),
      publishedYear: data.publishedYear ?? null,
      authorId: Number(data.authorId),
    };
    books.push(book);
    return decorateBook(book);
  },
  async updateBook(id, data) {
    await delay();
    const b = books.find(x => x.id === Number(id));
    if (!b) throw apiError(404, 'BOOK_NOT_FOUND', 'Книга не найдена', { bookId: Number(id) });
    Object.assign(b, data);
    return decorateBook(b);
  },
  async deleteBook(id) {
    await delay();
    const idx = books.findIndex(x => x.id === Number(id));
    if (idx === -1) throw apiError(404, 'BOOK_NOT_FOUND', 'Книга не найдена', { bookId: Number(id) });
    books.splice(idx, 1);
    return { ok: true };
  },
};