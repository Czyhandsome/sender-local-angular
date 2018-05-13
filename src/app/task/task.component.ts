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
    if (currentTask != null) {
      this.currentTask = currentTask;
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

  public endFetchOrder(taskId: string, orderId: string) {
    this.taskService.endFetchOrder(taskId, orderId)
      .subscribe(msg => {
        if (isSuccess(msg)) {
          alert(`Success! ${msg.data}`);
        } else {
          alert(`Fail! ${msg.msg}`);
        }
      });
  }

  public startSendOrder(taskId: string, orderId: string) {
    this.taskService.startSendOrder(taskId, orderId)
      .subscribe(msg => {
        if (isSuccess(msg)) {
          alert(`Success! ${msg.data}`);
        } else {
          alert(`Fail! ${msg.msg}`);
        }
      });
  }

  public verifyReceiver(taskId: string, orderId: string, code: string) {
    this.taskService.verifyReceiver(taskId, orderId, code)
      .subscribe(msg => {
        if (isSuccess(msg)) {
          alert(`Success! ${msg.data}`);
        } else {
          alert(`Fail! ${msg.msg}`);
        }
      });
  }

  public endSendOrder(taskId: string, orderId: string) {
    this.taskService.endSendOrder(taskId, orderId)
      .subscribe(msg => {
        if (isSuccess(msg)) {
          alert(`Success! ${msg.data}`);
        } else {
          alert(`Fail! ${msg.msg}`);
        }
      });
  }

  ngOnDestroy(): void {
    this.currentTaskSubscription.unsubscribe();
  }
}
