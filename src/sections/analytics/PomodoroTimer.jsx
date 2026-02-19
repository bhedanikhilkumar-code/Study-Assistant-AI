import { useEffect, useState } from 'react';

const DEFAULT_SECONDS = 25 * 60;

export default function PomodoroTimer({ onSessionLogged }) {
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_SECONDS);
  const [running, setRunning] = useState(false);
  const [subject, setSubject] = useState('General');

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setRunning(false);
          onSessionLogged({
            id: crypto.randomUUID(),
            subject,
            minutes: 25,
            date: new Date().toISOString()
          });
          return DEFAULT_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [running, onSessionLogged, subject]);

  return (
    <article className="card">
      <h3>Pomodoro Timer</h3>
      <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
      <p className="timer">{Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}</p>
      <div className="actions">
        <button onClick={() => setRunning(true)}>Start</button>
        <button onClick={() => setRunning(false)} className="secondary">Pause</button>
        <button
          onClick={() => {
            setRunning(false);
            setSecondsLeft(DEFAULT_SECONDS);
          }}
          className="secondary"
        >
          Stop
        </button>
      </div>
    </article>
  );
}
