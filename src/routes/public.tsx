import { Route } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Register,
  ResetPassword
} from '@pages';
import React from 'react';
import { IngredientDetails, OrderInfo } from '@components';

export const publicRoutes = (
  <>
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/forgot-password' element={<ForgotPassword />} />
    <Route path='/reset-password' element={<ResetPassword />} />
    <Route path='/' element={<ConstructorPage />} />
    <Route path='/feed' element={<Feed />} />
    <Route path='/ingredients/:id' element={<IngredientDetails />} />
    <Route path='/feed/:number' element={<OrderInfo />} />
    <Route path='*' element={<NotFound404 />} />
  </>
);
