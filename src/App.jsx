import { useEffect, useMemo, useState } from 'react';
import { NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useToast } from './components/ToastProvider';
import CommandPalette from './components/CommandPalette';
import WelcomeModal from './components/WelcomeModal';
import DashboardPage from './pages/DashboardPage';
import NotesPage from './pages/NotesPage';
import TasksPage from './pages/TasksPage';
import ChatPage from './pages/ChatPage';
import HelpPage from './pages/HelpPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { createDemoData } from './utils/demoData';

const navItems = [
  ['/', 'Dashboard'],
  ['/notes', 'Notes'],
  ['/tasks', 'Tasks'],
  ['/chat', 'Chat'],
  ['/analytics', 'Analytics'],
  ['/help', 'Help']
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(() => !localStorage.getItem('saai_seen_welcome'));
  const navigate = useNavigate();
  const location = useLocation();
  const { pushToast } = useToast();

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const actions = useMemo(
    () => [
      { label: 'New note', run: () => navigate('/notes?new=1') },
      { label: 'New task', run: () => navigate('/tasks?new=1') },
      { label: 'New chat', run: () => navigate('/chat?new=1') },
      ...navItems.map(([to, label]) => ({ label: `Go to ${label}`, run: () => navigate(to) }))
    ],
    [navigate]
  );

  const seedDemoData = () => {
    createDemoData();
    localStorage.setItem('saai_seen_welcome', '1');
    setShowWelcome(false);
    pushToast('Demo data added. Welcome to Study Assistant AI!');
  };

  const dismissWelcome = () => {
    localStorage.setItem('saai_seen_welcome', '1');
    setShowWelcome(false);
  };

  return (
    <div className="app-shell">
      <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
        ☰
      </button>
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h1>Study Assistant AI</h1>
        <nav>
          {navItems.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      {sidebarOpen && <button className="backdrop" onClick={() => setSidebarOpen(false)} aria-label="Close menu" />}
      <main>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </main>
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        actions={actions}
        onAction={(action) => {
          action.run();
          setPaletteOpen(false);
        }}
      />
      <WelcomeModal open={showWelcome} onClose={dismissWelcome} onSeed={seedDemoData} />
    </div>
  );
}
