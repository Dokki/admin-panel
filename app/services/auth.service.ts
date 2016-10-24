import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Router} from "@angular/router";

var CryptoJS = require("node_modules/crypto-js/crypto-js.js");
var CookiesService = require("app/services/cookies.service.js");

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
    private sessionUrl = 'https://api.quickblox.com/session.json';
    private loginUrl = 'https://api.quickblox.com/login.json';

    private appConfig = {
        id: 48231,
        key: 'EeqhcgLW-qZPTqN',
        secret: 'yXP6ejeahQXqnPY'
    };

    private timestamp: number;
    private nonce: number;

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    constructor(
        private _http: Http,
        private _router: Router
        // private _cookieService:CookieService
    ) { }

    public authenticated() {
        return (this.getSessionToken() !== null);
    }

    login(username: string, password: string): Promise<any> {
        return this.createSession()
            .then( resolve => this.loginUser(username, password));
    }

    logout() {
        // if (!localStorage.getItem('session_token')) {
        //     this._router.navigate(['/']);
        //     return;
        // }

        let headers = new Headers({
            'QuickBlox-REST-API-Version':'0.1.0',
            'QB-Token': this.getSessionToken()
        });

        this.removeSessionToken(); //TODO: do true session
        this._router.navigate(['/']);
        // return this._http
        //     .delete(this.loginUrl, { headers: headers })
        //     .toPromise()
        //     .then(() => {
        //         this.removeSessionToken();
        //         this._router.navigate(['/']);
        //     })
        //     .catch(this.handleError);
    }

    createSession(): Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'QuickBlox-REST-API-Version':'0.1.0'
        });

        this.timestamp = Date.now() / 1000 | 0;
        this.nonce = ~~(Math.random() * 1000000);

        return this._http
            .post(this.sessionUrl, JSON.stringify({
                "application_id": this.appConfig.id,
                "auth_key": this.appConfig.key,
                "timestamp": this.timestamp,
                "nonce": this.nonce,
                "signature": this.getSignature()
            }), {
                headers: headers
            })
            .toPromise()
            .then((res: any) => {
                let token = JSON.parse(res._body).session.token;
                this.saveSessionToken(token);
            })
            .catch(this.handleError);
    }

    loginUser(username: string, password: string): Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'QuickBlox-REST-API-Version':'0.1.0',
            'QB-Token': this.getSessionToken()
        });

        return this._http
            .post(this.loginUrl, JSON.stringify({
                "login": username,
                "password": password
            }), {
                headers: headers
            })
            .toPromise()
            .then(() => {
                this._router.navigate(['/event']);
            })
            .catch(this.handleError);
    }

    getSignature(): string {
        let data =
            'application_id=' + this.appConfig.id +
            '&auth_key=' + this.appConfig.key +
            '&nonce=' + this.nonce +
            '&timestamp=' + this.timestamp;

        return CryptoJS.HmacSHA1(data, this.appConfig.secret).toString(CryptoJS.enc.Hex);
    }

    getSessionToken(): string {
        return CookiesService.getCookie('session_token');
    }

    saveSessionToken(token: string): void {
        let expires = 2 * 60 * 60;//token expires after 2 hours
        return CookiesService.setCookie('session_token', token, {expires: expires});
    }
    removeSessionToken(): void {
        return CookiesService.deleteCookie('session_token');
    }
}

