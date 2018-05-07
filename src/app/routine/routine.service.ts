import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {ApiConfig} from '../config/api.config';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GenericMsg} from '../entity/generic-msg';

@Injectable()
export class RoutineService {

  constructor(private auth: AuthService,
              private http: HttpClient) {
  }

  getCurrentRoutine(): Observable<GenericMsg<any>> {
    const url = ApiConfig.currentRoutineUrl(this.auth.getId());
    return this.http.get<GenericMsg<any>>(url);
  }

}
