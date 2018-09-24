import { Injectable } from '@angular/core';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { UserInfo_Epics } from './userinfo/userinfo.epic';

@Injectable()
export class RootEpic {

    constructor(private userInfoEpic: UserInfo_Epics) {

    }

    public createEpics() {
        return [
            createEpicMiddleware(this.userInfoEpic.getRootEpic<any>())
        ];
    }
}