import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {PushService} from './push.service';
import {Subscription} from 'rxjs/Subscription';
import {TaskPreview} from './task.preview';

const NO_PUSH_MSG = '当前没有推送任务!';

@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.css']
})
@Injectable()
export class PushComponent implements OnInit, OnDestroy {
  public pushMsg: TaskPreview;

  private subscription: Subscription;

  constructor(private push: PushService) {
  }

  /**
   * 接受任务
   */
  public accept() {
    if (this.pushMsg) {
      this.push.accept(this.pushMsg.id);
    }
  }

  /**
   * 拒绝任务
   */
  public reject() {
    if (this.pushMsg) {
      this.push.reject(this.pushMsg.id);
    }
  }

  ngOnInit() {
    this.push.connect();
    this.subscription = this.push.taskObserver()
      .subscribe(data => {
        this.pushMsg = data;
      });
  }

  ngOnDestroy() {
    this.push.disconnect();
  }

}
