import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useSelector } from '../../services/store';
import { resetOrder, sendOrder } from '../../services/order/orderSlice';
import { clearIngredients } from '../../services/burgerConstructor/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const constructorItems = useSelector((state) => state.burgerConstructor);
  const orderRequest = useSelector((state) => state.order.isRequest);
  const orderModalData = useSelector((state) => state.order.order);
  const orderData = useSelector(
    (state) => state.burgerConstructor.orderIngredients
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    dispatch(sendOrder(orderData));
  };
  const closeOrderModal = () => {
    dispatch(clearIngredients());
    dispatch(resetOrder());
  };

  const price = useMemo(() => {
    const bun = constructorItems.bun;
    const bunPrice = bun ? bun.price * 2 : 0;

    const ingredientsPrice = constructorItems.ingredients.reduce(
      (sum: number, item: TConstructorIngredient) => sum + item.price,
      0
    );

    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
