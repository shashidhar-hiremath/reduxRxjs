import { FluxStandardAction } from 'flux-standard-action';
import { IErrorResponse } from "../../model/IErrorResponce";
import { ClientState } from "../store.model";
import { UserInfo_Actions } from './userinfo.action';

export type FSAction = FluxStandardAction<any, any>;

export const INITIAL_STATE_USER_INFO: ClientState<any> = { state: [], loading: false, error: '' };

export const userInfoResult = (state: ClientState<any> = INITIAL_STATE_USER_INFO, action: FSAction): ClientState<any> => {
    switch (action.type) {
        case UserInfo_Actions.ActionTypes.USERINFO_LOAD_STARTED:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case UserInfo_Actions.ActionTypes.USERINFO_LOAD_SUCCEEDED:
            return {
                ...state,
                state: action.payload,
                loading: false,
                error: null,
            };
        case UserInfo_Actions.ActionTypes.USERINFO_LOAD_CANCELLED:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case UserInfo_Actions.ActionTypes.USERINFO_LOAD_FAILED:
            let errorMessage: string = "Error occured while fetching User Info records. Please try again.";
            let error: IErrorResponse = action.payload.error ? action.payload.error : { Error_Code: "500", Error_Description: action.payload.message };
            if (action.payload.status != undefined) {
                switch (action.payload.status) {
                    case "408": errorMessage = "Timeout elapsed while waiting for the Query Execution. Please try running query again.";
                        break;
                    case "500": errorMessage = (error.Error_Code == "msra_data_overflow" ? error.Error_Description : "Internal server error occured. Details: " + error.Error_Description);
                        break;
                    case "503": errorMessage = (error.Error_Code == "Network Issue" ? error.Error_Description : "Service Unavailable. Details: " + action.payload.message);
                        break;
                    default: errorMessage = action.payload.message != undefined ? action.payload.message : "";
                }
                console.log("SEARCH_LOAD_FAILED_DUNSID" + action.payload);
            }
            return Object.assign({}, INITIAL_STATE_USER_INFO, { error: errorMessage }, { loading: false });
        case UserInfo_Actions.ActionTypes.USERINFO_CLEAR_RESULTS:
            return INITIAL_STATE_USER_INFO;
        default: return state;
    }
};