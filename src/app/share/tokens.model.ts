export class Tokens {

  // tslint:disable-next-line:variable-name
  constructor(private _access: string, private _refresh: string,
              // tslint:disable-next-line:variable-name
              private _expireDate: Date, public scope: string = 'webclient',
              public username?: string) {
  }

  get access(): string {
    if (new Date() < this._expireDate) {
      return this._access;
    } else {
      return null;
    }
  }
}
