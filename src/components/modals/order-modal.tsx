import { Modal, OrderInfo } from '@components';
import { useLocation, useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { selectIsIngredientsLoading } from '../../services/ingredients/selectors';

export const OrderModal = () => {
  const isIngredientsLoading = useSelector(selectIsIngredientsLoading);
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
        <Modal title={''} onClose={onClose}>
          <OrderInfo />
        </Modal>
      )}
    </>
  );
};
