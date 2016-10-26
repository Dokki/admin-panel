import {Component, Input, OnInit} from '@angular/core';
import {GetRecordsService} from '../../services/get-records.servise';
import {LoaderComponent} from "../loader/loader.component";

@Component({
	selector: 'my-speaker',
	templateUrl: 'app/components/speaker/speaker.component.html',
	styleUrls: ['app/components/speaker/speaker.component.css']
})
export class SpeakerComponent implements OnInit {
	@Input()
	speakers:any[];

	constructor(private _getRecordsService:GetRecordsService, private _loader:LoaderComponent) { }

	ngOnInit() {
		this.getRecords('Speaker');
	}

	getRecords(class_name:string):void {
		this._loader.startLoading();
		this._getRecordsService.getRecords(class_name)
		.then((res) => {
			this.speakers = res;
			this._loader.finishLoading()
		})
	}
}
