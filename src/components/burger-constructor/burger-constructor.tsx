import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useSelector } from '../../services/store';
import { resetOrder, sendOrder } from '../../services/order/orderSlice';
import { clearIngredients } from '../../services/burgerConstructor/burgerConstructorSlice';
import {
  selectIngredients,
  selectOrderIngredients
} from '../../services/burgerConstructor/selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectIsAuthorized } from '../../services/auth/selectors';
import {
  selectIsOrderRequest,
  selectOrder
} from '../../services/order/selectors';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = useSelector(selectIsAuthorized);
  const constructorItems = useSelector(selectIngredients);
  const orderRequest = useSelector(selectIsOrderRequest);
  const orderModalData = useSelector(selectOrder);
  const orderData = useSelector(selectOrderIngredients);
  const onOrderClick = () => {
    if (!isAuth) {
      navigate('/login', { state: { from: location } });
      return;
    }
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
