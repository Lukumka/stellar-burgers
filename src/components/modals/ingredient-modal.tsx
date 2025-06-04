import { IngredientDetails, Modal } from '@components';
import { useLocation, useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';

export const IngredientModal = () => {
  const isIngredientsLoading = useSelector(
    (state) => state.ingredients.isLoading
  );
  const navigate = useNavigate();
  const location = useLocation();
  const onClose = () => {
    const background = location.state.background.pathname;
    navigate(background);
  };

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <Modal title={'Детали ингредиента'} onClose={onClose}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};
