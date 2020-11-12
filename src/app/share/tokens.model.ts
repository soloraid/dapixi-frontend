export class tokens{
    constructor(private _access:string,public refresh:string,public expireIn:number,public scope:string){
    }
    get access(){
        return this._access;
    }
}