import { Link } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <section>
      <h2>Study Assistant AI Dashboard</h2>
      <p>Use <kbd>Ctrl/Cmd + K</kbd> to open the command palette.</p>
      <div className="card-grid">
        <Link className="card" to="/notes">
          Notes
        </Link>
        <Link className="card" to="/tasks">
          Tasks
        </Link>
        <Link className="card" to="/chat">
          Chat
        </Link>
        <Link className="card" to="/analytics">
          Analytics
        </Link>
      </div>
    </section>
  );
}
