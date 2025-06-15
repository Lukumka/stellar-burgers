import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useAppDispatch, useSelector } from '../../services/store';
import { registerUser } from '../../services/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';
import {
  selectIsAuthLoading,
  selectIsAuthorized
} from '../../services/auth/selectors';

export const Register: FC = () => {
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isSubmitting = useSelector(selectIsAuthLoading);

  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuthorized);
  const from = localStorage.getItem('from') || '/';
  useEffect(() => {
    if (isAuth) {
      navigate(from, { replace: true });
      localStorage.removeItem('from');
    }
  }, [isAuth, from, navigate]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      name: userName,
      email,
      password
    };
    dispatch(registerUser(data));
  };

  return (
    <>
      {isSubmitting ? (
        <Preloader />
      ) : (
        <RegisterUI
          errorText=''
          email={email}
          userName={userName}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          setUserName={setUserName}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};
