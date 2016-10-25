import {Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate} from '@angular/router';
import {AuthService} from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private _auth:AuthService, private router:Router) { }

	canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
		if (this._auth.authenticated()) {
			return true;
		} else {
			this.router.navigate(['/']);
			return false;
		}
	}
}