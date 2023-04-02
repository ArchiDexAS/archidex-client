export class Type {

    private _urlType: string = "";

    constructor(
        public idType: number, public name: string
    ){}

    public get urlType(): string{
        return this._urlType;
    }

    public set urlType(url: string){
        this._urlType = url;
    }

}
