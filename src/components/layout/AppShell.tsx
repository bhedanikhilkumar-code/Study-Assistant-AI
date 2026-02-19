import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/button';

const navItems = [
  { to: '/chat', label: 'Chat' },
  { to: '/planner', label: 'Planner' },
  { to: '/notes', label: 'Notes' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/settings', label: 'Settings' },
];

export function AppShell() {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: '100vh' }}>
      <aside style={{ borderRight: '1px solid #e2e8f0', padding: 16 }}>
        <h3>Study Assistant</h3>
        <nav style={{ display: 'grid', gap: 8 }}>
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} style={{ fontWeight: location.pathname === item.to ? 700 : 400 }}>
              {item.label}
            </Link>
          ))}
          {user && (
            <Link to="/admin" style={{ fontWeight: location.pathname === '/admin' ? 700 : 400 }}>
              Admin
            </Link>
          )}
        </nav>
      </aside>
      <main>
        <header
          style={{
            borderBottom: '1px solid #e2e8f0',
            padding: 16,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>{user ? `Signed in as ${user.name}` : 'Guest mode'}</span>
          {user && <Button onClick={logout}>Logout</Button>}
        </header>
        <section style={{ padding: 16 }}>
          <Outlet />
        </section>
      </main>
    </div>
  );
}
