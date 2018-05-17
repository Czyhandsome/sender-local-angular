import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {PushService} from './push.service';
import {Subscription} from 'rxjs/Subscription';
import {TaskPreview} from './task.preview';

@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.css']
})
@Injectable()
export class PushComponent implements OnInit, OnDestroy {
  public pushTask: TaskPreview;
  public message = '当前没有任务推送!';

  public handTaskId: string;

  private subscription: Subscription;

  constructor(private push: PushService) {
  }

  /**
   * 接受任务
   */
  public accept() {
    if (this.pushTask) {
      this.push.accept(this.pushTask.id);
      this.pushTask = null;
    }
  }

  /**
   * 手动拒绝任务
   * @param {string} taskId 任务id
   */
  public acceptHand(taskId: string) {
    this.push.accept(taskId);
  }

  /**
   * 拒绝任务
   */
  public reject() {
    if (this.pushTask) {
      this.push.reject(this.pushTask.id);
      this.pushTask = null;
    }
  }

  ngOnInit() {
    this.push.connect();
    this.subscription = this.push.taskObserver()
      .subscribe(data => {
        this.message = '当前有任务推送!';
        this.pushTask = data;
      });
  }

  ngOnDestroy() {
    this.push.disconnect();
  }

}
