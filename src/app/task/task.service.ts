import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../auth/auth.service';
import {Injectable} from '@angular/core';
import {ApiConfig} from '../config/api';
import {GenericMsg} from '../entity/generic-msg';

@Injectable()
export class TaskService {
  constructor(private http: HttpClient,
              private auth: AuthService) {
  }

  public getCurrentTask(): Observable<any> {
    const CURRENT_TASK_URL = ApiConfig.currentTaskUrl(this.auth.getId());
    return this.http.get<GenericMsg<any>>(CURRENT_TASK_URL)
      .map(msg => msg.data);
  }
}
