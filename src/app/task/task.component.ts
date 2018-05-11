import {Subscription, timer as observableTimer} from 'rxjs';
import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from './task.service';
import {CurrentTask} from './current-task';
import {TaskStatus} from './task.status';
import {TaskDto} from './task.dto';


@Component({
  selector: 'app-task',
  templateUrl: 'task.component.html'
})
@Injectable()
export class TaskComponent implements OnInit, OnDestroy {
  private currentTaskSubscription: Subscription;

  currentTask: CurrentTask;
  taskDto: TaskDto;

  orderButtonName: string;

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
    this.orderButtonName = '开始取件';
    this.taskService.getAllFetch(taskId)
      .subscribe(taskDto => this.taskDto = taskDto,
        error => console.error(error));
  }

  // 处理送件任务
  private handleTaskSendOrders(taskId: string) {
    this.orderButtonName = '开始送件';
    this.taskService.getAllSend(taskId)
      .subscribe(taskDto => this.taskDto = taskDto,
        error => console.error(error));
  }

  public handleOrder(orderId: string, taskId: string) {
    switch (this.currentTask.taskStatus) {
      case TaskStatus.FETCHING:
      case TaskStatus.SENDING:
    }
  }

  ngOnDestroy(): void {
    this.currentTaskSubscription.unsubscribe();
  }
}
