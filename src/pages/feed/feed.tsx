import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useSelector } from '../../services/store';
import { selectFeedOrders } from '../../services/feed/feedSelectors';
import { fetchFeed } from '../../services/feed/feedThunks';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFeed());
  }, []);
  const orders = useSelector(selectFeedOrders);
  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeed());
      }}
    />
  );
};
