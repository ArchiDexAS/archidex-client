import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Utils {

    constructor() { }

    generateRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min);
    }

}
