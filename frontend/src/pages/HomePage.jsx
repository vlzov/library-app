import { useState } from 'react';
import AuthorList from '../components/AuthorList';
import BookList from '../components/BookList';
import AddAuthorForm from '../components/AddAuthorForm';
import AddBookForm from '../components/AddBookForm';

export default function HomePage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);

  const refresh = () => setRefreshKey(k => k + 1);

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Library</h1>
        <p className="subtitle">
          Manage authors and their books — works with or without backend.
        </p>
      </header>

      <main className="grid">
        <section className="col">
          <AddAuthorForm onCreated={refresh} />
          <AuthorList
            refreshKey={refreshKey}
            selectedAuthorId={selectedAuthorId}
            onSelectAuthor={setSelectedAuthorId}
          />
        </section>

        <section className="col">
          <AddBookForm onCreated={refresh} refreshKey={refreshKey} />
          <BookList
            refreshKey={refreshKey}
            filterAuthorId={selectedAuthorId}
            onClearFilter={() => setSelectedAuthorId(null)}
          />
        </section>
      </main>

      <footer className="app-footer">
        {import.meta.env.VITE_USE_MOCK === 'true'
          ? 'Running in demo mode (VITE_USE_MOCK=true)'
          : 'Auto-fallback to demo mode if backend is unavailable'}
      </footer>
    </div>
  );
}