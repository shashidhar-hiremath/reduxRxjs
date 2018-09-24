import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RequestOptions, URLSearchParams, Headers, Response, ResponseContentType } from '@angular/http';

const URLS = {
    USER_INFO_DATA: 'https://jsonplaceholder.typicode.com/users'
};

@Injectable()
export class UserInfo_Service {

    constructor(private http: HttpClient) { }

    public UserInfoData(payload: any): Observable<any> {
        let headersObj = new HttpHeaders({ 'Content-Type': 'application/json', timeout: `${600 * 1000}` });
        let objectToSend = JSON.stringify(payload);
        console.log("sending search PAYLOAD>>>>>>>>>>>>>>");

        return this.http.get<any>(URLS.USER_INFO_DATA, payload)
            .pipe(map((resp:any) => {
                        return {
                            results: resp.body
                        }
                    }),
                    catchError(this.handleError));
    }

    private handleError(error: Response): Observable<any> {

        if (JSON.stringify(error).indexOf('The operation has timed out') > 0 || JSON.stringify(error).indexOf("TimeoutError") > 0) {
            return Observable.throw(Object.assign({}, { status: "408", message: "Timeout elapsed while waiting for the Query Execution. Please try running query again.", error: error }));
        }
        else if (error.status == 0) {
            return Observable.throw(Object.assign({}, { status: "503", message: "Service Unavailable. Please check your network connection and try running query again.", error: error.statusText }));
        }
        else {
            console.error(error);
            console.log(error);
            return Observable.throw(error.json().error || 'Server error');
        }
    }
}