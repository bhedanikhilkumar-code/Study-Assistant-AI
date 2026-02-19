import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { useToast } from '../components/ToastProvider';

export default function NotesPage() {
  const [notes, setNotes] = useLocalStorageState('saai_notes', []);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { pushToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchParams.get('new')) {
      document.getElementById('note-title')?.focus();
    }
  }, [searchParams]);

  const addNote = () => {
    if (!title.trim()) return;
    setNotes((prev) => [...prev, { id: crypto.randomUUID(), title, content }]);
    setTitle('');
    setContent('');
    pushToast('Note created');
  };

  return (
    <section>
      <h2>Notes</h2>
      <div className="panel">
        <input id="note-title" placeholder="Note title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
        <button onClick={addNote}>New note</button>
      </div>
      {loading ? (
        <LoadingSkeleton rows={4} />
      ) : notes.length === 0 ? (
        <EmptyState
          title="No notes yet"
          description="Capture lecture highlights and summaries."
          cta="Create first note"
          onCta={() => document.getElementById('note-title')?.focus()}
        />
      ) : (
        <ul className="list">
          {notes.map((note) => (
            <li key={note.id}>
              <strong>{note.title}</strong>
              <p>{note.content}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
