import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { User } from '../model/user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    private usersUrl = 'app/users';  // URL to web API

    constructor(private http: Http) { }

    getUsers(): Observable<User[]> {
        return this.http.get(this.usersUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getGitHubRepositories(params: any): Observable<any> {
        console.log(`call github api now:${Date.now()}`);
        return this.http.get(`https://api.github.com/search/repositories?${this.toParamsString(params)}`)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    searchUsers(userName: string): Observable<User[]> {
        return this.http.get(this.usersUrl + `?name=^${userName}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getUserByName(userName: string): Observable<User> {
        return this.http.get(this.usersUrl + `?name=${userName}`)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addUser(name: string): Observable<User> {
        return this.http.post(this.usersUrl, { name })
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private toParamsString(params: any): string {
        let urlSearchParams = new URLSearchParams();
        for (let key in params) {
            urlSearchParams.append(key, params[key]);
        };
        return urlSearchParams.toString();
    }
}
