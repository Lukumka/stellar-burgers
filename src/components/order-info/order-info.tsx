import { FC, useEffect, useMemo } from 'react';
import { OrderInfoUI, Preloader } from '@ui';
import { TIngredient } from '@utils-types';
import { useAppDispatch, useSelector } from '../../services/store';
import { useLocation } from 'react-router-dom';
import { selectCurrentOrder } from '../../services/feed/feedSelectors';
import { selectItems } from '../../services/ingredients/ingredientsSelectors';
import { fetchOrder } from '../../services/feed/feedThunks';

export const OrderInfo: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const orderNumber = Number(location.pathname.replace('/feed/', ''));
  useEffect(() => {
    dispatch(fetchOrder(orderNumber));
  }, []);
  const orderData = useSelector(selectCurrentOrder);
  const ingredients = useSelector(selectItems);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
