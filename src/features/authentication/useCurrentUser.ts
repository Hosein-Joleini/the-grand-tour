import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuthentication';

export default function useCurrentUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return { user, isLoading, isAuthenticated: user?.role === 'authenticated' };
}
