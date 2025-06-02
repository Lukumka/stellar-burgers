import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';
import { Preloader } from '@ui';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useSelector((state) => state.auth.isAuthorized);
  const isAuthChecked = useSelector((state) => state.auth.isAuthoriseChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!isAuth) {
    localStorage.setItem('from', location.pathname);
    return <Navigate to='/login' replace />;
  }
  return <>{children}</>;
};
