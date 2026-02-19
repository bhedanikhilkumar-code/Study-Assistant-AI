import { Navigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { useAuth } from '../../hooks/useAuth';

export function LoginPage() {
  const { isAuthenticated, loginAsAdmin, loginAsUser } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/chat" replace />;
  }

  return (
    <div style={{ maxWidth: 360, margin: '4rem auto', display: 'grid', gap: 12 }}>
      <h1>Login</h1>
      <p>Choose a demo session.</p>
      <Button onClick={loginAsUser}>Continue as Student</Button>
      <Button onClick={loginAsAdmin}>Continue as Admin</Button>
    </div>
  );
}
