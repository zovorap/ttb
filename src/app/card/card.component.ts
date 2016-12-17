import { Component, OnInit } from '@angular/core';

import { AppSettings } from '../app.settings';
import { AppService } from '../app.service';
import { Sillables } from '../models/sillables';

@Component({
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {
    sillable: string;
    dice: string;
    time: number;    

    constructor(
        private appSettings: AppSettings,
        private appService: AppService
    ) {
    }

    ngOnInit() {
        this.dice = this.appService.getDiceValue();
        this.sillable = this.appService.getSillable();
        this.appService.setBomb();
    }
}
