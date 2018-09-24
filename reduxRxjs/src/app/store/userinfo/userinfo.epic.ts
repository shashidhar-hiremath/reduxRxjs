import { Injectable } from '@angular/core';
import { Epic, createEpicMiddleware, combineEpics } from 'redux-observable';
import { of } from 'rxjs/';
import { catchError, map, startWith, mergeMap, takeUntil} from 'rxjs/operators';

import { IAppState, FSAction } from '../store.model';
import { UserInfo_Actions } from './userinfo.action';
import { UserInfo_Service } from './userinfo.service';

@Injectable()
export class UserInfo_Epics {
    constructor(private userInfo_Service: UserInfo_Service, private userInfo_Actions: UserInfo_Actions) { }

    public userInfo_EPIC():  Epic<FSAction,FSAction,IAppState> { 
            return (action$, store) => action$
            .ofType(UserInfo_Actions.ActionTypes.USERINFO_SEARCH)
            .pipe(
                mergeMap((a:any) => this.userInfo_Service.UserInfoData(a.payload)
                .pipe(
                        takeUntil(action$.ofType(UserInfo_Actions.ActionTypes.USERINFO_LOAD_CANCELLED)),
                        map((data: any) => this.userInfo_Actions.loadSucceededForUserInfo(data)),
                        catchError((response: any) => of(this.userInfo_Actions.loadFailedForUserInfo({
                            status: (response.name == "TimeoutError" ? 502 : response.status),
                            message: response.message,
                            error: response.error
                        }))),
                        startWith(this.userInfo_Actions.clearResults(), this.userInfo_Actions.loadStartedForUserInfo())
                    )
                )
            );
            
    }

    getRootEpic = () => combineEpics(
        this.userInfo_EPIC()
	);
}
