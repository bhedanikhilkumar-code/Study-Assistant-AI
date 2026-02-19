import { useEffect, useMemo, useState } from 'react';

export default function CommandPalette({ open, onClose, actions, onAction }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }
    const onEsc = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  const filtered = useMemo(
    () => actions.filter((action) => action.label.toLowerCase().includes(query.toLowerCase())),
    [actions, query]
  );

  if (!open) return null;

  return (
    <div className="palette-overlay" onClick={onClose}>
      <div className="palette" onClick={(e) => e.stopPropagation()}>
        <input autoFocus placeholder="Type a command..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <div>
          {filtered.map((action) => (
            <button key={action.label} onClick={() => onAction(action)}>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
