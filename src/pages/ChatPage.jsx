import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import { useToast } from '../components/ToastProvider';

export default function ChatPage() {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const { pushToast } = useToast();

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (searchParams.get('new')) {
      setMessages([]);
      pushToast('Started a new chat');
      inputRef.current?.focus();
    }
  }, [searchParams, pushToast]);

  const send = () => {
    if (!value.trim()) return;
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), text: value }]);
    setValue('');
  };

  return (
    <section>
      <h2>Chat</h2>
      <p>Press <kbd>/</kbd> anywhere to focus chat input.</p>
      <div className="panel row">
        <input ref={inputRef} placeholder="Ask something..." value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={send}>Send</button>
      </div>
      {messages.length === 0 ? (
        <EmptyState title="No messages" description="Start a conversation with your AI tutor." cta="Focus input" onCta={() => inputRef.current?.focus()} />
      ) : (
        <ul className="list">
          {messages.map((m) => (
            <li key={m.id}>{m.text}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
