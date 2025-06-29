import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../services/store';
import { Preloader } from '@ui';
import { ReactNode } from 'react';
import {
  selectIsAuthChecked,
  selectIsAuthorized
} from '../services/auth/selectors';

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: {
  children: ReactNode;
  onlyUnAuth?: boolean;
}) => {
  const isAuth = useSelector(selectIsAuthorized);
  const isAuthChecked = useSelector(selectIsAuthChecked);
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
