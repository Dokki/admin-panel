import {Component, Input, OnInit} from '@angular/core';
import {GetRecordsService} from '../../services/get-records.servise';

@Component({
	selector: 'my-speaker',
	templateUrl: 'app/components/speaker/speaker.component.html',
	styleUrls: ['app/components/speaker/speaker.component.css']
})
export class SpeakerComponent implements OnInit {
	@Input()
	speakers:any[];

	constructor(private _getRecordsService:GetRecordsService) { }

	ngOnInit() {
		this.getRecords('Speaker');
	}

	getRecords(class_name:string):void {
		this._getRecordsService.getRecords(class_name)
		.then((res) => {
			this.speakers = res;
		})
	}
}
