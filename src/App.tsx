import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import AppLayout from './ui/AppLayout';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Tours from './pages/Tours';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Booking from './pages/Booking';
import ConfirmBooking from './features/cash-out/ConfirmBooking';
import Account from './pages/Account';
import Login from './pages/Login';
import ProtectedRoutes from './ui/ProtectedRoutes';
import PageNotFound from './pages/PageNotFound';
import { DarkModeProvider } from './context/DarkModeContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position='top-center'
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: '#fff',
              color: '#1e293b',
            },
          }}
        />
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route index element={<Navigate to='dashboard' replace />} />
              <Route path='account' element={<Account />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='bookings' element={<Bookings />} />
              <Route path='bookings/:bookingId' element={<Booking />} />
              <Route path='confirm/:confirmId' element={<ConfirmBooking />} />
              <Route path='tours' element={<Tours />} />
              <Route path='users' element={<Users />} />
              <Route path='settings' element={<Settings />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}
