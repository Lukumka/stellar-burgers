import { ProfileUI } from '@ui-pages';
import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { TUser } from '@utils-types';
import { selectIsAuthLoading, selectUser } from '../../services/auth/selectors';
import { updateUser } from '../../services/auth/authThunks';

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const isSubmitting = useSelector(selectIsAuthLoading);
  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const user: TUser = { name: formValue.name, email: formValue.email };
    dispatch(updateUser(user));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  return (
    <>
      {isSubmitting ? (
        <Preloader />
      ) : (
        <ProfileUI
          formValue={formValue}
          isFormChanged={isFormChanged}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
        />
      )}
    </>
  );
};
