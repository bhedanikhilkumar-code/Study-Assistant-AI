import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { useToast } from '../components/ToastProvider';

export default function TasksPage() {
  const [tasks, setTasks] = useLocalStorageState('saai_tasks', []);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('General');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { pushToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchParams.get('new')) {
      document.getElementById('task-title')?.focus();
    }
  }, [searchParams]);

  const addTask = () => {
    if (!title.trim()) return;
    setTasks((prev) => [...prev, { id: crypto.randomUUID(), title, subject, done: false }]);
    setTitle('');
    pushToast('Task created');
  };

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  return (
    <section>
      <h2>Tasks</h2>
      <div className="panel row">
        <input id="task-title" placeholder="Task" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <button onClick={addTask}>New task</button>
      </div>
      {loading ? (
        <LoadingSkeleton rows={4} />
      ) : tasks.length === 0 ? (
        <EmptyState
          title="No tasks planned"
          description="Add your next assignment to stay on track."
          cta="Create first task"
          onCta={() => document.getElementById('task-title')?.focus()}
        />
      ) : (
        <ul className="list">
          {tasks.map((task) => (
            <li key={task.id}>
              <label>
                <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
                {task.title} <small>({task.subject})</small>
              </label>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
