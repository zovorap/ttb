export class Level {
    id: number;
    range: number[];
    stars: number[];
    cssClass: string;

    constructor(range: number[], i: number) {
        this.id = i + 1;
        this.range = range;
        this.stars = Array.from(Array(this.id), (x,j) => j + 1);

        this.cssClass = [
            'success',
            'info',
            'warning'
        ][i];
    }
}
