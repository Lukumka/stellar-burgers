import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/feed/feedSlice';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFeed());
  }, []);
  const orders = useSelector((state) => state.feed.orders);
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
