import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectIngredient } from '../../services/ingredients/selectors';
import { useLocation } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const location = useLocation();
  const id = location.pathname.replace('/ingredients/', '');
  const ingredientData = useSelector(selectIngredient(id)) ?? null;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
