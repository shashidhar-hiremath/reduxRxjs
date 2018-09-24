import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { FSAction } from '../store.model';

Injectable()
export class UserInfo_Actions {
    static readonly ActionTypes = {
        USERINFO_SEARCH: 'USERINFO/SEARCH',
        USERINFO_LOAD_STARTED: 'USERINFO/LOAD_STARTED',
        USERINFO_LOAD_SUCCEEDED: 'USERINFO/LOAD_SUCCEEDED',
        USERINFO_LOAD_FAILED: 'USERINFO/LOAD_FAILED',
        USERINFO_LOAD_CANCELLED: 'USERINFO/LOAD_CANCELLED',
        USERINFO_CLEAR_RESULTS: 'USERINFO/CLEAR_RESULTS'
    };

    @dispatch()
    loadUserInfo = (payload: any): FSAction => ({
        type: UserInfo_Actions.ActionTypes.USERINFO_SEARCH,
        meta: null,
        payload: payload,
    });

    public loadStartedForUserInfo = (): FSAction => ({
        type: UserInfo_Actions.ActionTypes.USERINFO_LOAD_STARTED,
        meta: null,
        payload: null,
    })

    public loadSucceededForUserInfo = (payload: any): FSAction => ({
        type: UserInfo_Actions.ActionTypes.USERINFO_LOAD_SUCCEEDED,
        meta: null,
        payload,
    })

    public loadFailedForUserInfo = (error: any): FSAction => ({
        type: UserInfo_Actions.ActionTypes.USERINFO_LOAD_FAILED,
        meta: null,
        payload: error,
        error: true,
    })

    @dispatch()
    public clearResults = (): FSAction => ({
        type: UserInfo_Actions.ActionTypes.USERINFO_CLEAR_RESULTS,
        meta: null,
        payload: null,
    });

    @dispatch()
    public loadCancelled = (): FSAction => ({
        type: UserInfo_Actions.ActionTypes.USERINFO_LOAD_CANCELLED,
        meta: null,
        payload: null,
    })
}