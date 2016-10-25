import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
	selector: 'my-app',
	templateUrl: 'app/components/app/app.component.html',
	styleUrls: ['app/components/app/app.component.css']
})
export class AppComponent {
	constructor(private _auth:AuthService) { }

	isLogin():boolean {
		return this._auth.authenticated();
	}
}
