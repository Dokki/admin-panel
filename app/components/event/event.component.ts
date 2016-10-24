import {Component, Input, OnInit} from '@angular/core';
import {GetRecordsService} from '../../services/get-records.servise';

import {Event} from '../../event';

@Component({
    selector: 'my-event',
    templateUrl: 'app/components/event/event.component.html',
    styleUrls: ['app/components/event/event.component.css']
})
export class EventComponent implements OnInit {
    @Input()
    events: Event[];

    constructor(private _getRecordsService:GetRecordsService) {
    }

    ngOnInit() {
        this.getRecords('Event');
    }

    getRecords(class_name: string): void {
        this._getRecordsService.getRecords(class_name)
            .then((res) => {
                this.events = res;
                console.log('events');
                console.log(this.events);
            })
    }
}
