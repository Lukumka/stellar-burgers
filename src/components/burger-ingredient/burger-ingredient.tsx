import { FC, memo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useAppDispatch } from '../../services/store';
import {
  addIngredient,
  parseIngredientIds
} from '../../services/burgerConstructor/burgerConstructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const locationState = { background: location };
    const handleAdd = useCallback(() => {
      dispatch(addIngredient(ingredient));
      dispatch(parseIngredientIds());
    }, [dispatch, ingredient]);

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={locationState}
        handleAdd={handleAdd}
      />
    );
  }
);
