import {Injectable} from '@angular/core';
import {ApiConfig} from '../config/api.config';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  private ws: WebSocket;

  constructor(private auth: AuthService) {
  }

  public connect() {
    this.ws = new WebSocket(ApiConfig.WEBSOCKET_URL(this.auth.getId()));
  }

  public disconnect() {
    this.ws.close();
  }
}
