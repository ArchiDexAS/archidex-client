import { Type } from "./type";

export class Dtopoke {

    private _urlPoke: string = "";

    constructor(
        public idPokedex: number, public name: string, public types: Type[]
    ) { }

    public get urlPoke(): string{
        return this._urlPoke;
    }

    public set urlPoke(urlPoke: string){
        this._urlPoke = urlPoke;
    }

}
