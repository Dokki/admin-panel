import {Component} from '@angular/core';

@Component({
	selector: 'loader',
	templateUrl: 'app/components/loader/loader.component.html',
	styleUrls: ['app/components/loader/loader.component.css']
})
export class LoaderComponent {
	isLoading = false;

	startLoading():void {
		this.isLoading = true;
	}

	finishLoading():void {
		this.isLoading = false;
	}

	loaded():boolean {
		return this.isLoading;
	}
}
