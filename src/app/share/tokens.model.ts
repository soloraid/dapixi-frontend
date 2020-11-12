export class tokens{
    constructor(private _access:string,public refresh:string,public expireIn:number,public scope:string){
        // access_token: string;
        // token_type: string;
        // refresh_token: string;
        // expires_in: number;
        // scope: string;
        // jti: string;
    }
    get access(){
        return this._access;
    }
}