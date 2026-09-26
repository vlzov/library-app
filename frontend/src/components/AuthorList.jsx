import { useEffect, useState } from 'react';
import { getAuthors, deleteAuthor } from '../api/authors';
import ConfirmDialog from './ConfirmDialog';
import { useToast } from './ToastContext';

export default function AuthorList({ onSelectAuthor, selectedAuthorId, refreshKey }) {
  const [authors, setAuthors] = useState([]);
  const [pendingId, setPendingId] = useState(null);
  const { push } = useToast();

  useEffect(() => {
    getAuthors().then(setAuthors).catch(() => {});
  }, [refreshKey]);

  const confirmDelete = async () => {
    const id = pendingId;
    setPendingId(null);
    try {
      await deleteAuthor(id);
      setAuthors(a => a.filter(x => x.id !== id));
      if (selectedAuthorId === id) onSelectAuthor(null);
      push('Author deleted', 'success');
    } catch (_) {}
  };

  return (
    <div className="card">
      <div className="card-head">
        <h2 className="card-title">✍️ Authors</h2>
        <span className="badge">{authors.length}</span>
      </div>

      {authors.length === 0 && <p className="empty">No authors yet.</p>}

      <ul className="list">
        {authors.map(a => (
          <li
            key={a.id}
            className={`list-item ${selectedAuthorId === a.id ? 'is-active' : ''}`}
            onClick={() => onSelectAuthor(a.id)}
          >
            <div className="list-main">
              <div className="list-title">{a.name}</div>
              <div className="list-sub">
                {a.country || '—'} · {a.booksCount} book{a.booksCount === 1 ? '' : 's'}
              </div>
            </div>
            <button
              className="icon-btn"
              title="Delete"
              onClick={(e) => { e.stopPropagation(); setPendingId(a.id); }}
            >✕</button>
          </li>
        ))}
      </ul>

      <ConfirmDialog
        open={pendingId != null}
        title="Delete author?"
        message="This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setPendingId(null)}
      />
    </div>
  );
}