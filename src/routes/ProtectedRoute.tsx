import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';
import { Preloader } from '@ui';
import { ReactNode } from 'react';

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: {
  children: ReactNode;
  onlyUnAuth?: boolean;
}) => {
  const isAuth = useSelector((state: any) => state.auth.isAuthorized);
  const isAuthChecked = useSelector(
    (state: any) => state.auth.isAuthoriseChecked
  );
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuth) {
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
