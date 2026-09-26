import { useEffect, useState } from 'react';
import { createBook } from '../api/books';
import { getAuthors } from '../api/authors';
import { useToast } from './ToastContext';

export default function AddBookForm({ onCreated, refreshKey }) {
  const [authors, setAuthors] = useState([]);
  const [form, setForm] = useState({ title: '', publishedYear: '', authorId: '' });
  const [busy, setBusy] = useState(false);
  const { push } = useToast();

  useEffect(() => {
    getAuthors().then(setAuthors).catch(() => {});
  }, [refreshKey]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    const payload = {
      title: form.title,
      publishedYear: form.publishedYear ? Number(form.publishedYear) : null,
      authorId: Number(form.authorId),
    };
    try {
      await createBook(payload);
      push(`Book "${payload.title}" added`, 'success');
      setForm({ title: '', publishedYear: '', authorId: '' });
      onCreated();
    } catch (_) {}
    finally { setBusy(false); }
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h3 className="card-title">📖 Add Book</h3>
      <label className="field">
        <span>Title</span>
        <input name="title" value={form.title} onChange={handleChange}
               placeholder="e.g. War and Peace" required />
      </label>
      <label className="field">
        <span>Year</span>
        <input name="publishedYear" type="number" value={form.publishedYear}
               onChange={handleChange} placeholder="1869" />
      </label>
      <label className="field">
        <span>Author</span>
        <select name="authorId" value={form.authorId}
                onChange={handleChange} required>
          <option value="">Select author…</option>
          {authors.map(a => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </label>
      <button className="btn btn-primary" disabled={busy}>
        {busy ? 'Saving…' : 'Create'}
      </button>
    </form>
  );
}