import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiConfig} from '../config/api.config';
import {AuthService} from '../auth/auth.service';
import {SenderLocation} from './sender.location';
import {GenericMsg, isSuccess} from '../entity/generic-msg';
import {log} from '../logger';

// 默认坐标
const longitude = 117.311147;
const latitude = 31.831619;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient,
              private auth: AuthService) {
  }

  public updateLocation() {
    const url = ApiConfig.updateLocationUrl(this.auth.getSenderId());
    this.http.post<GenericMsg<any>>(url, new SenderLocation(longitude, latitude))
      .subscribe(msg => {
        if (isSuccess(msg)) {
          log('上传位置信息成功');
        } else {
          log(`上传位置信息失败: ${msg.msg}`);
        }
      });
  }
}
