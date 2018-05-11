import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Injectable} from '@angular/core';
import {GenericMsg} from '../entity/generic-msg';
import {ApiConfig} from '../config/api.config';
import {map} from 'rxjs/operators';

@Injectable()
export class TaskService {
  constructor(private http: HttpClient,
              private auth: AuthService) {
  }

  public getCurrentTask(): Observable<any> {
    const CURRENT_TASK_URL = ApiConfig.currentTaskUrl(this.auth.getSenderId());
    return this.http.get<GenericMsg<any>>(CURRENT_TASK_URL)
      .pipe(map(msg => msg.data));
  }
}
