import { Route } from 'react-router-dom';
import {
  ForgotPassword,
  Login,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { ProtectedRoute } from './ProtectedRoute';
import { OrderInfo } from '@components';
import React from 'react';

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
    <Route
      path='/login'
      element={
        <ProtectedRoute onlyUnAuth>
          <Login />
        </ProtectedRoute>
      }
    />
    <Route
      path='/register'
      element={
        <ProtectedRoute onlyUnAuth>
          <Register />
        </ProtectedRoute>
      }
    />
    <Route
      path='/forgot-password'
      element={
        <ProtectedRoute onlyUnAuth>
          <ForgotPassword />
        </ProtectedRoute>
      }
    />
    <Route
      path='/reset-password'
      element={
        <ProtectedRoute onlyUnAuth>
          <ResetPassword />
        </ProtectedRoute>
      }
    />
  </>
);
