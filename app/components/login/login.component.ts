import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {LoaderComponent} from '../loader/loader.component';

@Component({
	selector: 'login',
	templateUrl: 'app/components/login/login.component.html',
	styleUrls: ['app/components/login/login.component.css']
})
export class LoginComponent {
	constructor(private _auth:AuthService, private _loader:LoaderComponent) { }

	login(username:string, password:string):void {
		this._loader.startLoading();
		this._auth.login(username, password)
			.then( resolve => this._loader.finishLoading() );
	}
}
