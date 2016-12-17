import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';

@Component({
    selector: 'ttb-boom',
    templateUrl: './boom.component.html',
    styleUrls: ['./boom.component.less']
})
export class BoomComponent implements OnInit {
    words: string[];
    sillable: string;
    dice: string;
    hasWords: boolean;
    showExplosion: boolean;

    constructor(private appService: AppService) {
        this.sillable = this.appService.getCurrentRoundSillable();
        this.dice = this.appService.getDiceValue();
        this.hasWords = !!this.appService.getCurrentRoundWords() && !!this.appService.getCurrentRoundWords().length;
    }

    ngOnInit() {
        this.showExplosion = true;

        setTimeout(() => {
            this.showExplosion = false;
        }, 1700);
    }

    private showWords() {
        this.words = this.appService.getCurrentRoundWords();

        if(!!this.words && !!this.words.length) {
            this.words.forEach((word: string, i: number) => this.words[i] = this.highlightSillable(word));
        }
    }

    private highlightSillable(word: string): string {
        let highlight = '<b class="word-accent">' +  this.sillable + '</b>';

        if(this.dice === 'tick') {
            word = highlight + word.slice(this.sillable.length);
        } else if(this.dice === 'tock') {
            word = word.slice(0, word.length - this.sillable.length) + highlight;
        } else {
            word = word.replace(this.sillable, highlight);
        }

        return word;
    }
}
