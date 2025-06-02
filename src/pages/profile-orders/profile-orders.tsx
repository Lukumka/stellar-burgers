import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useSelector } from '../../services/store';
import { getUserFeed } from '../../services/userFeed/userFeedSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserFeed());
  }, [dispatch]);
  const isLoading = useSelector((state) => state.userFeed.isLoading);
  const isSubmitting = useSelector((state) => state.auth.isLoading);
  const orders = useSelector((state) => state.userFeed.orders);
  return (
    <>
      {isLoading || isSubmitting ? (
        <Preloader />
      ) : (
        <ProfileOrdersUI orders={orders} />
      )}
    </>
  );
};
