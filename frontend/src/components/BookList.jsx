import { useEffect, useState } from 'react';
import { getBooks, getBooksByAuthor, deleteBook } from '../api/books';
import ConfirmDialog from './ConfirmDialog';
import { useToast } from './ToastContext';

export default function BookList({ refreshKey, filterAuthorId, onClearFilter }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pendingId, setPendingId] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    setLoading(true);
    const req = filterAuthorId
      ? getBooksByAuthor(filterAuthorId)
      : getBooks();
    req.then(setBooks).catch(() => {}).finally(() => setLoading(false));
  }, [refreshKey, filterAuthorId]);

  const confirmDelete = async () => {
    const id = pendingId;
    setPendingId(null);
    try {
      await deleteBook(id);
      setBooks(b => b.filter(x => x.id !== id));
      push('Book deleted', 'success');
    } catch (_) {}
  };

  return (
    <div className="card">
      <div className="card-head">
        <h2 className="card-title">📚 Books</h2>
        <div className="card-head-right">
          <span className="badge">{books.length}</span>
          {filterAuthorId && (
            <button className="btn btn-ghost btn-sm" onClick={onClearFilter}>
              Clear filter
            </button>
          )}
        </div>
      </div>

      {loading && <p className="empty">Loading…</p>}
      {!loading && books.length === 0 && <p className="empty">No books yet.</p>}

      <ul className="list">
        {books.map(b => (
          <li key={b.id} className="list-item static">
            <div className="list-main">
              <div className="list-title">
                {b.title} <span className="muted">({b.publishedYear ?? '—'})</span>
              </div>
              <div className="list-sub">{b.authorName}</div>
            </div>
            <button
              className="icon-btn"
              title="Delete"
              onClick={() => setPendingId(b.id)}
            >✕</button>
          </li>
        ))}
      </ul>

      <ConfirmDialog
        open={pendingId != null}
        title="Delete book?"
        message="This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setPendingId(null)}
      />
    </div>
  );
}