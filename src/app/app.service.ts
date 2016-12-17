import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AppSettings } from './app.settings';
import { Nouns } from './models/nouns';
import { Sillables } from './models/sillables';

@Injectable()
export class AppService {
    private dice: string;
    private nouns: string[];
    private sillables: Sillables;
    private level: number;
    private currentRoundSillable: string;
    private currentRoundWords: string[];
    private playedSillables: string[];
    private filteredSillables: any;

    constructor(
        private appSettings: AppSettings,
        private router: Router
    ) {
        this.nouns = new Nouns().getData();
        this.sillables = new Sillables();
        this.dice = 'boom';
        this.level = 1;
        this.resetPlayedSillables();

        this.setSillables(2);
        this.setSillables(3);
    }

    getDiceValue(): string {
        return this.dice;
    }

    setDiceValue(value: string): void {
        this.dice = value;
    }

    setLevel(level: number) {
        this.level = level;
    }

    getLevel(): number {
        return this.level;
    }

    getSillable(): string {
        if(!this.filteredSillables) {
            this.setFilteredSillables();
        }

        let index = Math.floor((Math.random() * Object.keys(this.filteredSillables).length) + 1) - 1;
        this.currentRoundSillable = Object.keys(this.filteredSillables)[index];
        this.currentRoundWords = this.filteredSillables[this.currentRoundSillable];
        this.playedSillables.push(this.currentRoundSillable);

        return this.currentRoundSillable;
    }

    getCurrentRoundWords(): string[] {
        return this.currentRoundWords;
    }

    getCurrentRoundSillable(): string {
        return this.currentRoundSillable;
    }

    setFilteredSillables() {
        this.filteredSillables = this.getFilteredSillables();
    }

    hasFilteredSillables(): boolean {
        return !!Object.keys(this.filteredSillables).length;
    }

    setBomb() {
        let audio = new Audio();
        audio.src = "./assets/tick-tock.mp3";        
        audio.load();

        let audioInterval = setInterval(() => {
            audio.play();
        }, 1000);

        let time = Math.floor((Math.random() * this.appSettings.maxTime) + this.appSettings.minTime);

        let timer = setInterval(() => {
            time--;

            if (!time) {
                audio.pause();
                clearInterval(timer);
                clearInterval(audioInterval);
                this.router.navigate(['/boom']);
                this.explode();
            }
        }, 1000);
    }

    resetPlayedSillables() {
        this.playedSillables = [];
    }

    private explode() {
        let audio = new Audio();
        audio.src = "./assets/explosion.mp3";
        audio.load();
        audio.play();
    }

    private fitsLevel(matches: number): boolean {
        let range = this.appSettings.levels[this.appSettings.levels.length - this.level];
        return matches >= range[0] && matches <= range[1];
    }

    private setSillables(sillableLength: number) {
        this.nouns.forEach((noun, i) => {
            let pos = 0;

            for (let letter of noun) {
                if (pos < (noun.length - (sillableLength - 1))) {
                    let sillable = noun.substr(pos, sillableLength);

                    if (this.isWordBeginning(noun, sillable)) {
                        this.sillables.tick[sillable] = this.sillables.tick[sillable] || [];
                        this.sillables.tick[sillable].push(noun);
                    }

                    if (this.isWordEnding(noun, sillable)) {
                        this.sillables.tock[sillable] = this.sillables.tock[sillable] || [];
                        this.sillables.tock[sillable].push(noun);
                    }

                    this.sillables.boom[sillable] = this.sillables.boom[sillable] || [];
                    this.sillables.boom[sillable].push(noun);
                }

                pos++;
            }
        });
    }

    private isWordBeginning(word: string, sillable: string) {
        return word.substr(0, sillable.length) === sillable;
    }

    private isWordEnding(word: string, sillable: string) {
        return word.substr(word.length - sillable.length, sillable.length) === sillable;
    }

    private getFilteredSillables() {
        let filtered = {};
        let sillables = this.sillables[this.dice];
        
        for(let key in sillables) {
            if(this.fitsLevel(sillables[key].length) && this.playedSillables.indexOf(key) === -1) {
                filtered[key] = sillables[key]; 
            }
        }

        return filtered;
    }
}
