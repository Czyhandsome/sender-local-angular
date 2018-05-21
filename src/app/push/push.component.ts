import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {PushService} from './push.service';
import {Subscription} from 'rxjs/Subscription';
import {TaskPreview} from './task.preview';
import {isSuccess} from '../entity/generic-msg';
import {timer} from 'rxjs/index';

const initialMsg = '当前没有任务推送!';

@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.css']
})
@Injectable()
export class PushComponent implements OnInit, OnDestroy {
  public pushTask: TaskPreview;
  public message = initialMsg;

  public handTaskId: string;

  private subscription: Subscription;

  constructor(private push: PushService) {
  }

  /**
   * 接受任务
   */
  public accept() {
    if (this.pushTask) {
      this.acceptHand(this.pushTask.id);
    }
  }

  /**
   * 手动拒绝任务
   * @param {string} taskId 任务id
   */
  public acceptHand(taskId: string) {
    this.push.accept(taskId)
      .subscribe((msg) => {
        if (isSuccess(msg)) {
          this.changeMsg(`${new Date()} ==> 接受任务{${taskId}成功!`);
          this.pushTask = null;
        } else {
          this.changeMsg(`${new Date()} ==> 接受任务{${taskId}失败! 原因: ${msg.msg}`);
        }
      });
  }

  /**
   * 拒绝任务
   */
  public reject() {
    if (this.pushTask) {
      const taskId = this.pushTask.id;
      this.push.reject(this.pushTask.id)
        .subscribe((msg) => {
          if (isSuccess(msg)) {
            this.changeMsg(`${new Date()} ==> 拒绝任务{${taskId}成功!`);
            this.pushTask = null;
          } else {
            this.changeMsg(`${new Date()} ==> 拒绝任务{${taskId}失败! 原因: ${msg.msg}`);
          }
        });
    }
  }

  // 修改信息
  private changeMsg(msg: string) {
    console.log(msg);
    this.message = msg;
    timer(1500)
      .subscribe(() => this.message = initialMsg);
  }

  ngOnInit() {
    this.push.connect();
    this.subscription = this.push.taskObserver()
      .subscribe(data => {
        this.message = '当前有任务推送!';
        this.pushTask = data;
        console.log(`${new Date()} ==> 任务{${data.id}推送!`);
      });
  }

  ngOnDestroy() {
    this.push.disconnect();
  }

}
