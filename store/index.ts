import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import modal from './reducer/modal';
import web from './reducer/web';
import auth from './reducer/auth';
import cart from './reducer/cart';
import order from './reducer/order';
import film from './reducer/film';

const reducer = combineReducers({ web, modal, auth, cart, order, film });
const store = configureStore({ reducer });
export default store;
