import {Injectable} from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {Tokens} from './share/tokens.model';
import {Observable} from 'rxjs';
import {AuthService} from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})


export class ThirdPartyOAuthSSOService implements Resolve<Tokens> {

  constructor(private service: AuthService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Tokens> | Promise<Tokens> | Tokens {
    const accessToken: string = route.queryParamMap.get('access_token');
    const refreshToken: string = route.queryParamMap.get('refresh_token');
    const expiresIn: number = +route.queryParamMap.get('expires_in');
    if (!accessToken) {
      return null;
    }
    const tokens: Tokens = new Tokens(accessToken, refreshToken, new Date(new Date().getTime() + expiresIn * 1000));
    // this.service.authState.next(tokens);
    localStorage.setItem('tokens', JSON.stringify(tokens));
    return tokens;
  }
}
