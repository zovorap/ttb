import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';

@Component({
    templateUrl: './dice.component.html',
    styleUrls: ['./dice.component.less']
})
export class DiceComponent implements OnInit {
    value: string;
    values = ['tick', 'tock', 'boom'];
    hasCards: boolean;

    constructor(private appService: AppService) { }

    ngOnInit() {
        this.rollTheDice();
    }

    private rollTheDice() {
        this.value = this.values[Math.floor((Math.random() * this.values.length) + 1) - 1];
        this.appService.setDiceValue(this.value);
        this.appService.setFilteredSillables();
        this.hasCards = this.appService.hasFilteredSillables();
    }
}
