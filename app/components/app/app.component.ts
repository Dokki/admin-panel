import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {LoaderComponent} from '../loader/loader.component';

@Component({
	selector: 'my-app',
	templateUrl: 'app/components/app/app.component.html',
	styleUrls: ['app/components/app/app.component.css']
})
export class AppComponent {
	constructor(private _auth:AuthService, private _loader:LoaderComponent) { }

	isLogin():boolean {
		return this._auth.authenticated();
	}
	
	isLoading():boolean {
		return this._loader.loaded();
	}
}
