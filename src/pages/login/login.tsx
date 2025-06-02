import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/auth/authSlice';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isSubmitting = useSelector((state) => state.auth.isLoading);
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuthorized);
  const from = localStorage.getItem('from') || '/';
  useEffect(() => {
    if (isAuth) {
      navigate(from, { replace: true });
      localStorage.removeItem('from');
    }
  }, [isAuth, from, navigate]);

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
