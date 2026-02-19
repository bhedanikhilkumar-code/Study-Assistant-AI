import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { AdminPage } from '../sections/admin/AdminPage';
import { AnalyticsPage } from '../sections/analytics/AnalyticsPage';
import { LoginPage } from '../sections/auth/LoginPage';
import { ChatPage } from '../sections/chat/ChatPage';
import { NotesPage } from '../sections/notes/NotesPage';
import { PlannerPage } from '../sections/planner/PlannerPage';
import { SettingsPage } from '../sections/settings/SettingsPage';

export const appRouter = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          { path: '/', element: <Navigate to="/chat" replace /> },
          { path: '/chat', element: <ChatPage /> },
          { path: '/planner', element: <PlannerPage /> },
          { path: '/notes', element: <NotesPage /> },
          { path: '/analytics', element: <AnalyticsPage /> },
          { path: '/settings', element: <SettingsPage /> },
          {
            element: <ProtectedRoute adminOnly />,
            children: [{ path: '/admin', element: <AdminPage /> }],
          },
        ],
      },
    ],
  },
]);
