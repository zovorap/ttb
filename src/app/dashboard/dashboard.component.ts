import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppSettings } from '../app.settings';
import { AppService } from '../app.service';
import { Level } from '../models/level';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
    levels: Level[];

    constructor(
        private appSettings: AppSettings,
        private appService: AppService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.levels = [];

        this.appSettings.levels.forEach((range: number[], i: number) => {
            this.levels.push(new Level(range, i));
        });
    }

    newGame(level: number) {
        this.appService.resetPlayedSillables();
        this.appService.setLevel(level);        
        this.router.navigate(['/dice']);
    }
}
