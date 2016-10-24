import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Router} from "@angular/router";
import {Event} from "../event";
import {AuthService} from "./auth.service";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetRecordsService {
    private url = 'https://api.quickblox.com/data/';

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    constructor(
        private _http: Http,
        private _router: Router,
        private _auth: AuthService
    ) { }

    getRecords(class_name: string): Promise<any> {
        let headers = new Headers({
            'QB-Token': this._auth.getSessionToken()
        });

        return this._http
            .get(this.url + class_name + '.json', { headers: headers })
            .toPromise()
            .then( res => res.json().items as Event[])
            .catch(this.handleError);
    }
}

