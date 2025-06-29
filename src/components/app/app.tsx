import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../services/store';
import React, { useEffect } from 'react';
import { publicRoutes } from '../../routes/public';
import { privateRoutes } from '../../routes/private';
import { IngredientModal } from '../modals/ingredient-modal';
import { OrderModal } from '../modals/order-modal';
import { ProtectedRoute } from '../../routes/ProtectedRoute';
import { fetchIngredients } from '../../services/ingredients/ingredientsThunks';
import { checkUserAuth } from '../../services/auth/authThunks';

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkUserAuth());
  }, []);

  const location = useLocation();
  const state = location.state as { background?: Location };
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={state?.background || location}>
        {publicRoutes}
        {privateRoutes}
      </Routes>
      {state?.background && (
        <Routes>
          <Route path='/ingredients/:id' element={<IngredientModal />} />
          <Route path='/feed/:number' element={<OrderModal />} />
          <Route
            path='/profile/feed/:number'
            element={
              <ProtectedRoute>
                <OrderModal />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
