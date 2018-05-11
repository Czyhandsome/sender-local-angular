import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {PushService} from './push.service';

@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.css']
})
@Injectable()
export class PushComponent implements OnInit, OnDestroy {
  public pushMsg: string;

  constructor(private push: PushService) {
  }

  ngOnInit() {
    this.push.connect();
    this.push.listen(this.updatePushMsg);
  }

  private updatePushMsg(event: MessageEvent) {
    this.pushMsg = JSON.stringify(event.data);
  }

  ngOnDestroy() {
    this.push.disconnect();
  }

}
