export class Tokens{
    constructor(private _access:string,public refresh:string,public expireDate:Date,public scope:string){
    }
    get access(){
        if(new Date>this.expireDate){
            return this._access;
        }else{
            return null
        }
    }
}