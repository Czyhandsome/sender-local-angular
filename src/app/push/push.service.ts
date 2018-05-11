import {Injectable} from '@angular/core';
import {ApiConfig} from '../config/api.config';
import {AuthService} from '../auth/auth.service';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {TaskPreview} from './task.preview';
import {PayloadObject} from '../entity/payload.object';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  private subject: WebSocketSubject<PayloadObject<TaskPreview>>;

  constructor(private auth: AuthService,
              private http: HttpClient) {
  }

  public connect() {
    this.subject = webSocket(ApiConfig.WEBSOCKET_URL(this.auth.getSenderId()));
  }

  public taskObserver(): Observable<TaskPreview> {
    return this.subject
      .pipe(map(payload => payload.object));
  }

  public disconnect() {
    this.subject.unsubscribe();
  }

  /**
   * 接受任务
   * @param {string} taskId 任务id
   */
  public accept(taskId: string) {
    const url = ApiConfig.acceptTaskUrl(this.auth.getSenderId(), taskId);
    this.http.post(url, {})
      .subscribe(() => {
        console.log('接受任务成功!');
      });
  }

  /**
   * 拒绝任务
   * @param {string} taskId 任务id
   */
  public reject(taskId: string) {
    const url = ApiConfig.rejectTaskUrl(this.auth.getSenderId(), taskId);
    this.http.post(url, {})
      .subscribe(() => {
        console.log('拒绝任务成功!');
      });
  }
}
