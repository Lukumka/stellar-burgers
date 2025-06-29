import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { selectIsAuthLoading } from '../../services/auth/selectors';
import {
  selectIsUserFeedLoading,
  selectUserFeedOrders
} from '../../services/userFeed/userFeedSelectors';
import { getUserFeed } from '../../services/userFeed/userFeedThunks';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserFeed());
  }, [dispatch]);
  const isLoading = useSelector(selectIsUserFeedLoading);
  const isSubmitting = useSelector(selectIsAuthLoading);
  const orders = useSelector(selectUserFeedOrders);
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
