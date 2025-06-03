import { Route } from 'react-router-dom';
import { ConstructorPage, Feed, NotFound404 } from '@pages';
import React from 'react';
import { IngredientDetails, OrderInfo } from '@components';

export const publicRoutes = (
  <>
    <Route path='/' element={<ConstructorPage />} />
    <Route path='/feed' element={<Feed />} />
    <Route path='/ingredients/:id' element={<IngredientDetails />} />
    <Route path='/feed/:number' element={<OrderInfo />} />
    <Route path='*' element={<NotFound404 />} />
  </>
);
