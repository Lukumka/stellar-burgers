import { Route } from 'react-router-dom';
import { Profile, ProfileOrders } from '@pages';
import { ProtectedRoute } from './ProtectedRoute';
import { OrderInfo } from '@components';

export const privateRoutes = (
  <>
    <Route
      path='/profile'
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route
      path='/profile/feed'
      element={
        <ProtectedRoute>
          <ProfileOrders />
        </ProtectedRoute>
      }
    />
    <Route
      path='/profile/feed/:number'
      element={
        <ProtectedRoute>
          <OrderInfo />
        </ProtectedRoute>
      }
    />
  </>
);
