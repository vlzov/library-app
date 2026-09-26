import { useState } from 'react';
import { createAuthor } from '../api/authors';
import { useToast } from './ToastContext';

export default function AddAuthorForm({ onCreated }) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [busy, setBusy] = useState(false);
  const { push } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await createAuthor({ name, country });
      push(`Author "${name}" added`, 'success');
      setName(''); setCountry('');
      onCreated();
    } catch (_) {/* interceptors already notify */}
    finally { setBusy(false); }
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h3 className="card-title">➕ Add Author</h3>
      <label className="field">
        <span>Name</span>
        <input value={name} onChange={e => setName(e.target.value)}
               placeholder="e.g. Leo Tolstoy" required />
      </label>
      <label className="field">
        <span>Country</span>
        <input value={country} onChange={e => setCountry(e.target.value)}
               placeholder="e.g. Russia" />
      </label>
      <button className="btn btn-primary" disabled={busy}>
        {busy ? 'Saving…' : 'Create'}
      </button>
    </form>
  );
}