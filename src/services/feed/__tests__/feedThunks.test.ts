import { getFeedsApi, getOrderByNumberApi } from '@api';
import { fetchFeed, fetchOrder } from '../feedThunks';
import feedReducer, { initialState } from '../feedSlice';

jest.mock('@api', () => ({
  getFeedsApi: jest.fn(),
  getOrderByNumberApi: jest.fn()
}));

const dispatch = jest.fn();
const getState = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('fetchFeed', () => {
  it('fetchFeed - pending', async () => {
    const action = { type: fetchFeed.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });
  it('fetchFeed - fulfilled', async () => {
    const mockFeeds = {
      success: true,
      orders: [
        {
          _id: '684eb918c2f30c001cb2ce7c',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa0946',
            '643d69a5c3f7b9001cfa0947'
          ],
          status: 'done',
          name: 'Флюоресцентный минеральный фалленианский бессмертный бургер',
          createdAt: '2025-06-15T12:14:16.911Z',
          updatedAt: '2025-06-15T12:14:17.689Z',
          number: 81516
        },
        {
          _id: '684eaee8c2f30c001cb2ce53',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0946',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0946',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный минеральный люминесцентный бургер',
          createdAt: '2025-06-15T11:30:48.774Z',
          updatedAt: '2025-06-15T11:30:49.566Z',
          number: 81515
        },
        {
          _id: '684eaa8dc2f30c001cb2ce3a',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0946',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный spicy био-марсианский минеральный бургер',
          createdAt: '2025-06-15T11:12:13.845Z',
          updatedAt: '2025-06-15T11:12:14.587Z',
          number: 81514
        },
        {
          _id: '684ea68dc2f30c001cb2ce1e',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-15T10:55:09.112Z',
          updatedAt: '2025-06-15T10:55:09.856Z',
          number: 81513
        },
        {
          _id: '684ea4dfc2f30c001cb2ce18',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-15T10:47:59.245Z',
          updatedAt: '2025-06-15T10:47:59.966Z',
          number: 81512
        },
        {
          _id: '684ea411c2f30c001cb2ce15',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa094a',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный бессмертный астероидный метеоритный бургер',
          createdAt: '2025-06-15T10:44:33.522Z',
          updatedAt: '2025-06-15T10:44:34.286Z',
          number: 81511
        },
        {
          _id: '684ea227c2f30c001cb2ce08',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный метеоритный бургер',
          createdAt: '2025-06-15T10:36:23.248Z',
          updatedAt: '2025-06-15T10:36:24.023Z',
          number: 81510
        },
        {
          _id: '684e9d04c2f30c001cb2cdbf',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный бессмертный метеоритный бургер',
          createdAt: '2025-06-15T10:14:28.335Z',
          updatedAt: '2025-06-15T10:14:29.149Z',
          number: 81509
        },
        {
          _id: '684e98d7c2f30c001cb2cdb5',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-15T09:56:39.324Z',
          updatedAt: '2025-06-15T09:56:40.166Z',
          number: 81508
        },
        {
          _id: '684e9764c2f30c001cb2cdab',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный био-марсианский бургер',
          createdAt: '2025-06-15T09:50:28.719Z',
          updatedAt: '2025-06-15T09:50:29.621Z',
          number: 81507
        },
        {
          _id: '684e9544c2f30c001cb2cda7',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-15T09:41:24.419Z',
          updatedAt: '2025-06-15T09:41:25.141Z',
          number: 81506
        },
        {
          _id: '684e8e95c2f30c001cb2cd96',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-15T09:12:53.802Z',
          updatedAt: '2025-06-15T09:12:54.541Z',
          number: 81505
        },
        {
          _id: '684e8e5fc2f30c001cb2cd95',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0947',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный фалленианский бургер',
          createdAt: '2025-06-15T09:11:59.001Z',
          updatedAt: '2025-06-15T09:11:59.763Z',
          number: 81504
        },
        {
          _id: '684e8d10c2f30c001cb2cd8e',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-15T09:06:24.095Z',
          updatedAt: '2025-06-15T09:06:24.795Z',
          number: 81503
        },
        {
          _id: '684e8b92c2f30c001cb2cd89',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-15T09:00:02.930Z',
          updatedAt: '2025-06-15T09:00:03.787Z',
          number: 81502
        },
        {
          _id: '684e8b7dc2f30c001cb2cd88',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-15T08:59:41.572Z',
          updatedAt: '2025-06-15T08:59:42.296Z',
          number: 81501
        },
        {
          _id: '684e8497c2f30c001cb2cd7b',
          ingredients: [
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-15T08:30:15.322Z',
          updatedAt: '2025-06-15T08:30:16.079Z',
          number: 81500
        },
        {
          _id: '684e8027c2f30c001cb2cd73',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0945',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa0949',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный антарианский space экзо-плантаго метеоритный бургер',
          createdAt: '2025-06-15T08:11:19.405Z',
          updatedAt: '2025-06-15T08:11:20.185Z',
          number: 81499
        },
        {
          _id: '684e7674c2f30c001cb2cd60',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный био-марсианский бургер',
          createdAt: '2025-06-15T07:29:56.980Z',
          updatedAt: '2025-06-15T07:29:58.369Z',
          number: 81498
        },
        {
          _id: '684e39fcc2f30c001cb2cd2f',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0945',
            '643d69a5c3f7b9001cfa0943'
          ],
          status: 'done',
          name: 'Space флюоресцентный антарианский бургер',
          createdAt: '2025-06-15T03:11:56.556Z',
          updatedAt: '2025-06-15T03:11:57.406Z',
          number: 81497
        },
        {
          _id: '684e2e91c2f30c001cb2cd1c',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0945',
            '643d69a5c3f7b9001cfa0945',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0945',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный антарианский бургер',
          createdAt: '2025-06-15T02:23:13.426Z',
          updatedAt: '2025-06-15T02:23:14.241Z',
          number: 81496
        },
        {
          _id: '684e147cc2f30c001cb2cd0a',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
          status: 'done',
          name: 'Флюоресцентный бургер',
          createdAt: '2025-06-15T00:31:56.797Z',
          updatedAt: '2025-06-15T00:31:57.627Z',
          number: 81495
        },
        {
          _id: '684e13c9c2f30c001cb2cd08',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa0947',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный фалленианский бургер',
          createdAt: '2025-06-15T00:28:57.687Z',
          updatedAt: '2025-06-15T00:28:58.419Z',
          number: 81494
        },
        {
          _id: '684e0970c2f30c001cb2ccfb',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
          status: 'done',
          name: 'Флюоресцентный бургер',
          createdAt: '2025-06-14T23:44:48.134Z',
          updatedAt: '2025-06-14T23:44:48.992Z',
          number: 81493
        },
        {
          _id: '684dfcd3c2f30c001cb2cce1',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный spicy бургер',
          createdAt: '2025-06-14T22:50:59.348Z',
          updatedAt: '2025-06-14T22:51:00.133Z',
          number: 81492
        },
        {
          _id: '684df776c2f30c001cb2ccd9',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Метеоритный флюоресцентный био-марсианский бессмертный бургер',
          createdAt: '2025-06-14T22:28:06.128Z',
          updatedAt: '2025-06-14T22:28:06.984Z',
          number: 81491
        },
        {
          _id: '684df657c2f30c001cb2ccd2',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный метеоритный бургер',
          createdAt: '2025-06-14T22:23:19.895Z',
          updatedAt: '2025-06-14T22:23:20.659Z',
          number: 81490
        },
        {
          _id: '684df5d9c2f30c001cb2cccd',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa0940'
          ],
          status: 'done',
          name: 'Краторный био-марсианский люминесцентный метеоритный бургер',
          createdAt: '2025-06-14T22:21:13.540Z',
          updatedAt: '2025-06-14T22:21:14.283Z',
          number: 81489
        },
        {
          _id: '684df4f3c2f30c001cb2ccc8',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-14T22:17:23.841Z',
          updatedAt: '2025-06-14T22:17:24.649Z',
          number: 81488
        },
        {
          _id: '684df37cc2f30c001cb2ccc6',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный био-марсианский бургер',
          createdAt: '2025-06-14T22:11:08.689Z',
          updatedAt: '2025-06-14T22:11:09.473Z',
          number: 81487
        },
        {
          _id: '684df187c2f30c001cb2ccc4',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-14T22:02:47.712Z',
          updatedAt: '2025-06-14T22:02:48.438Z',
          number: 81486
        },
        {
          _id: '684df0a5c2f30c001cb2ccc3',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-14T21:59:01.676Z',
          updatedAt: '2025-06-14T21:59:02.386Z',
          number: 81485
        },
        {
          _id: '684deed1c2f30c001cb2ccbc',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-14T21:51:13.783Z',
          updatedAt: '2025-06-14T21:51:14.490Z',
          number: 81484
        },
        {
          _id: '684dee6bc2f30c001cb2ccbb',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-14T21:49:31.135Z',
          updatedAt: '2025-06-14T21:49:31.890Z',
          number: 81483
        },
        {
          _id: '684dee35c2f30c001cb2ccb9',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-14T21:48:37.956Z',
          updatedAt: '2025-06-14T21:48:38.689Z',
          number: 81482
        },
        {
          _id: '684dea1fc2f30c001cb2cca8',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный бургер',
          createdAt: '2025-06-14T21:31:11.646Z',
          updatedAt: '2025-06-14T21:31:12.349Z',
          number: 81481
        },
        {
          _id: '684de85ac2f30c001cb2cca6',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный био-марсианский бургер',
          createdAt: '2025-06-14T21:23:38.636Z',
          updatedAt: '2025-06-14T21:23:39.432Z',
          number: 81480
        },
        {
          _id: '684de70fc2f30c001cb2cca4',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0943',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Space флюоресцентный бургер',
          createdAt: '2025-06-14T21:18:07.980Z',
          updatedAt: '2025-06-14T21:18:08.773Z',
          number: 81479
        },
        {
          _id: '684dd379c2f30c001cb2cc6e',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa094a',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa0942',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный астероидный spicy метеоритный бургер',
          createdAt: '2025-06-14T19:54:33.820Z',
          updatedAt: '2025-06-14T19:54:34.596Z',
          number: 81478
        },
        {
          _id: '684dccdac2f30c001cb2cc63',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941'],
          status: 'done',
          name: 'Флюоресцентный био-марсианский бургер',
          createdAt: '2025-06-14T19:26:18.401Z',
          updatedAt: '2025-06-14T19:26:19.148Z',
          number: 81477
        },
        {
          _id: '684dc715c2f30c001cb2cc48',
          ingredients: [
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный био-марсианский бургер',
          createdAt: '2025-06-14T19:01:41.511Z',
          updatedAt: '2025-06-14T19:01:42.240Z',
          number: 81476
        },
        {
          _id: '684dc6c2c2f30c001cb2cc47',
          ingredients: [
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный люминесцентный бургер',
          createdAt: '2025-06-14T19:00:18.198Z',
          updatedAt: '2025-06-14T19:00:19.038Z',
          number: 81475
        },
        {
          _id: '684dc5c1c2f30c001cb2cc46',
          ingredients: [
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Био-марсианский флюоресцентный люминесцентный бессмертный бургер',
          createdAt: '2025-06-14T18:56:01.777Z',
          updatedAt: '2025-06-14T18:56:02.528Z',
          number: 81474
        },
        {
          _id: '684dc592c2f30c001cb2cc44',
          ingredients: [
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный био-марсианский бургер',
          createdAt: '2025-06-14T18:55:14.198Z',
          updatedAt: '2025-06-14T18:55:14.879Z',
          number: 81473
        },
        {
          _id: '684dc484c2f30c001cb2cc40',
          ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0942'],
          status: 'done',
          name: 'Краторный spicy бургер',
          createdAt: '2025-06-14T18:50:44.888Z',
          updatedAt: '2025-06-14T18:50:45.632Z',
          number: 81472
        },
        {
          _id: '684dc193c2f30c001cb2cc33',
          ingredients: [
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa093c'
          ],
          status: 'done',
          name: 'Краторный био-марсианский бургер',
          createdAt: '2025-06-14T18:38:11.983Z',
          updatedAt: '2025-06-14T18:38:12.733Z',
          number: 81471
        },
        {
          _id: '684dc15ac2f30c001cb2cc32',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-14T18:37:14.287Z',
          updatedAt: '2025-06-14T18:37:15.139Z',
          number: 81470
        },
        {
          _id: '684dc0bdc2f30c001cb2cc2e',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-14T18:34:37.652Z',
          updatedAt: '2025-06-14T18:34:38.372Z',
          number: 81469
        },
        {
          _id: '684dbfbfc2f30c001cb2cc24',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный био-марсианский бургер',
          createdAt: '2025-06-14T18:30:23.719Z',
          updatedAt: '2025-06-14T18:30:24.451Z',
          number: 81468
        },
        {
          _id: '684dbf70c2f30c001cb2cc23',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-14T18:29:04.349Z',
          updatedAt: '2025-06-14T18:29:05.088Z',
          number: 81467
        }
      ],
      total: 81142,
      totalToday: 126
    };
    (getFeedsApi as jest.Mock).mockResolvedValue(mockFeeds);
    const thunk = fetchFeed();
    const result = await thunk(dispatch, getState, {});

    expect(getFeedsApi).toHaveBeenCalled();
    expect(result.type).toBe('feed/fetchFeed/fulfilled');
    expect(result.payload).toEqual(mockFeeds);
  });
  it('fetchFeed - rejected ', async () => {
    (getFeedsApi as jest.Mock).mockRejectedValue(
      new Error('failed to fetchFeed')
    );
    const thunk = fetchFeed();
    const result = await thunk(dispatch, getState, undefined);
    expect(result.type).toBe('feed/fetchFeed/rejected');
    expect(result.payload).toBe('Ошибка загрузки заказов');
  });
});

describe('fetchOrder', () => {
  it('fetchOrder - pending', async () => {
    const action = { type: fetchOrder.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });
  it('fetchOrder - fulfilled', async () => {
    const mockOrder = {
      success: true,
      orders: [
        {
          _id: '684f4018c2f30c001cb2d096',
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa093e',
            '643d69a5c3f7b9001cfa093d'
          ],
          owner: '684f1dd3c2f30c001cb2d01e',
          status: 'done',
          name: 'Флюоресцентный люминесцентный бургер',
          createdAt: '2025-06-15T21:50:16.999Z',
          updatedAt: '2025-06-15T21:50:17.741Z',
          number: 81607,
          __v: 0
        }
      ]
    };
    (getOrderByNumberApi as jest.Mock).mockResolvedValue(mockOrder);
    const thunk = fetchOrder(81607);
    const result = await thunk(dispatch, getState, {});
    expect(getOrderByNumberApi).toHaveBeenCalled();
    expect(result.type).toBe('feed/fetchOrder/fulfilled');
    expect(result.payload).toEqual(mockOrder);
  });
  it('fetchOrder - rejected ', async () => {
    (getOrderByNumberApi as jest.Mock).mockRejectedValue(
      new Error('failed to fetchOrder')
    );
    const thunk = fetchOrder(123);
    const result = await thunk(dispatch, getState, undefined);
    expect(result.type).toBe('feed/fetchOrder/rejected');
    expect(result.payload).toBe('Ошибка загрузки заказа');
  });
});
