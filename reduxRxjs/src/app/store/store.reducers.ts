import { combineReducers, Reducer, Action } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';
import { FluxStandardAction } from 'flux-standard-action';
import { ClientState, FSAction } from './store.model';
import { userInfoResult } from './userinfo/userinfo.reducer';

export const rootReducer = composeReducers(
    defaultFormReducer(),
    combineReducers({
        userInfoResult
    })
);