import {Subscription, timer as observableTimer} from 'rxjs';
import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from './task.service';
import {CurrentTask} from './current-task';
import {TaskStatus} from './task.status';
import {TaskDto} from './task.dto';
import {isSuccess} from '../entity/generic-msg';


@Component({
  selector: 'app-task',
  templateUrl: 'task.component.html'
})
@Injectable()
export class TaskComponent implements OnInit, OnDestroy {
  private currentTaskSubscription: Subscription;

  // ********** 数据 ********** //
  currentTask: CurrentTask = null;
  taskDto: TaskDto = null;

  // 图片
  orderPhoto: File;

  // 提示信息
  taskMessage: string = null;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.currentTaskSubscription = observableTimer(0, 2000)
      .subscribe(() => {
        this.taskService.getCurrentTask()
          .subscribe(currentTask => this.handleCurrentTask(currentTask));
      });
  }

  // 处理当前的任务
  private handleCurrentTask(currentTask: CurrentTask) {
    this.currentTask = currentTask;
    if (currentTask == null) {
      this.taskDto = null;
    } else {
      const taskId = currentTask.taskId;
      switch (currentTask.taskStatus) {
        case TaskStatus.FETCHING:
          this.handleTaskFetchOrders(taskId);
          break;
        case TaskStatus.SENDING:
          this.handleTaskSendOrders(taskId);
          break;
      }
    }
  }

  // 处理取件任务
  private handleTaskFetchOrders(taskId: string) {
    this.taskService.getAllFetch(taskId)
      .subscribe(taskDto => {
        this.taskDto = taskDto;
      });
  }

  // 处理送件任务
  private handleTaskSendOrders(taskId: string) {
    this.taskService.getAllSend(taskId)
      .subscribe(taskDto => this.taskDto = taskDto,
        error => console.error(error));
  }

  public startFetchOrder(taskId: string, orderId: string) {
    this.taskService.startFetchOrder(taskId, orderId)
      .subscribe(msg => {
        if (isSuccess(msg)) {
          this.changeMsg(`Success! ${JSON.stringify(msg.data)}`);
        } else {
          this.changeMsg(`Fail! ${msg.msg}`);
        }
      });
  }

  private changeMsg(msg: string) {
    this.taskMessage = msg;
  }

  // 读取图片
  public getFile(event) {
    this.orderPhoto = event.target.files.item(0);
  }

  public endFetchOrder(taskId: string, orderId: string) {
    if (!this.orderPhoto) {
      alert('没有选择订单相片!');
    } else {
      this.taskService.endFetchOrder(taskId, orderId, this.orderPhoto)
        .subscribe(msg => {
          if (isSuccess(msg)) {
            this.changeMsg(`Success! ${JSON.stringify(msg.data)}`);
          } else {
            this.changeMsg(`Fail! ${msg.msg}`);
          }
        });
    }
  }

  public startSendOrder(taskId: string, orderId: string) {
    this.taskService.startSendOrder(taskId, orderId)
      .subscribe(msg => {
        if (isSuccess(msg)) {
          this.changeMsg(`Success! ${JSON.stringify(msg.data)}`);
        } else {
          this.changeMsg(`Fail! ${msg.msg}`);
        }
      });
  }

  public verifyReceiver(taskId: string, orderId: string) {
    this.taskService.verifyReceiver(taskId, orderId, '661266')
      .subscribe(msg => {
        if (isSuccess(msg)) {
          this.changeMsg(`Success! ${JSON.stringify(msg.data)}`);
        } else {
          this.changeMsg(`Fail! ${msg.msg}`);
        }
      });
  }

  public endSendOrder(taskId: string, orderId: string) {
    this.taskService.endSendOrder(taskId, orderId)
      .subscribe(msg => {
        if (isSuccess(msg)) {
          this.changeMsg(`Success! ${JSON.stringify(msg.data)}`);
        } else {
          this.changeMsg(`Fail! ${msg.msg}`);
        }
      });
  }

  ngOnDestroy(): void {
    this.currentTaskSubscription.unsubscribe();
  }
}
