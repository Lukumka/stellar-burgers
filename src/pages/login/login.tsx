import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/auth/authSlice';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isSubmitting = useSelector((state: any) => state.auth.isLoading);
  const isAuthorized = useSelector((state: any) => state.auth.isAuthorized);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthorized) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthorized, location, navigate]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <>
      {isSubmitting ? (
        <Preloader />
      ) : (
        <LoginUI
          errorText=''
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};
