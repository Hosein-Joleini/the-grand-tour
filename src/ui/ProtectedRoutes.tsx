import { PropsWithChildren, useEffect } from 'react';
import useCurrentUser from '../features/authentication/useCurrentUser';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoutes({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useCurrentUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading)
    return (
      <div className='h-dvh flex justify-center items-center bg-gray-50 dark:bg-gray-900'>
        <Loader />
      </div>
    );

  if (isAuthenticated) return children;
}
