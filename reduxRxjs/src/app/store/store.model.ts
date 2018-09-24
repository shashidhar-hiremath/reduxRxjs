import { FluxStandardAction } from 'flux-standard-action';
import { INITIAL_STATE_USER_INFO } from './userinfo/userinfo.reducer';
interface MetaData { };

// Flux-standard-action gives us stronger typing of our actions.
export type FSAction = FluxStandardAction<any, MetaData | null | number>;

export interface ClientState<State> {
    state: State | null;
    loading: boolean;
    error: any;
}

export interface IAppState {
    userInfoResult?: any;
}

export const INITIAL_STATE: IAppState = <IAppState>{
    userInfoResult:INITIAL_STATE_USER_INFO
}