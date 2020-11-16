export class Tokens{
    constructor(private _access:string,private _refresh:string,private _expireDate:Date,public scope:string){
    }
    get access(){
        if(new Date()<this._expireDate){
            return this._access;
        }else{
            return null
        }
    }
}