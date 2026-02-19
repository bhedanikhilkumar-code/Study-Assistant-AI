import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { appRouter } from './router/AppRouter';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  );
}
