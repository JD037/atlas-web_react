// 0x08_react_redux_action_creator_normalizr/task_7/dashboard/src/actions/uiActionCreators.test.js

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { login, loginRequest, loginSuccess, loginFailure, boundLoginRequest } from './uiActionCreators';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from './uiActionTypes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Async Action Creators', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates LOGIN and LOGIN_SUCCESS when loginRequest is successful', () => {
    fetchMock.getOnce('/dist/login-success.json', {
      body: { success: true },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: LOGIN, user: { email: 'test@example.com', password: 'password123' } },
      { type: LOGIN_SUCCESS },
    ];

    const store = mockStore({});
    return store.dispatch(loginRequest('test@example.com', 'password123')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates LOGIN and LOGIN_FAILURE when loginRequest fails', () => {
    fetchMock.getOnce('/dist/login-success.json', 404);

    const expectedActions = [
      { type: LOGIN, user: { email: 'test@example.com', password: 'password123' } },
      { type: LOGIN_FAILURE },
    ];

    const store = mockStore({});
    return store.dispatch(loginRequest('test@example.com', 'password123')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
