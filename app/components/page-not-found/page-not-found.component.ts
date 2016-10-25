import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'login',
    templateUrl: 'app/components/login/login.component.html',
    styleUrls: ['app/components/login/login.component.css']
})
export class LoginComponent {
    constructor(private _auth: AuthService) { }

    login(username: string, password: string): void {
        username = 'test_admin';
        password = 'password';//TODO: mock for quick dev

        this._auth.login(username, password)
            .then(() => {} );
    }
}