import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {GenericMsg} from '../entity/generic-msg';
import {TokenObject} from './token-object';
import {ApiConfig} from '../config/api.config';
import {RouterService} from '../router/router.service';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient,
              private router: RouterService) {
  }

  // 执行登录
  public doLogin(phonenumber: string, password: string): Observable<string> {
    return this.http.post<GenericMsg<TokenObject>>(ApiConfig.AUTH_URL, {
      phonenumber: phonenumber,
      password: password
    }).map(msg => {
      const data = msg.data;
      this.saveToken(
        data.senderId,
        data.tokenObject.access_token,
        data.tokenObject.expires_in,
        data.tokenObject.expires_in
      );
      return 'success';
    }, error => {
      throw new Error('登录失败!原因: ' + error);
    });
  }

  // 执行取消登录
  public logout() {
    this.removeToken();
    this.router.jumpTo('/login');
  }

  // 保存token
  private saveToken(id, token, refreshToken, expiresIn) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token', refreshToken);
    const expireTime = String(new Date().getTime() + expiresIn * 1000);
    localStorage.setItem('expire_time', expireTime);
  }

  private removeToken() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expire_time');
  }

  // 获取token
  public getToken(): string {
    return localStorage.getItem('token');
  }

  // 获取快递员id
  public getId(): string {
    return localStorage.getItem('id');
  }

  // 是否已经授权
  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (token == null) {
      return false;
    }
    const now = new Date().getTime();
    return now < Number(localStorage.getItem('expire_time'));
  }
}
