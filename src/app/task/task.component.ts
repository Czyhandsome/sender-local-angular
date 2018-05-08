import {Subscription, timer as observableTimer} from 'rxjs';
import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from './task.service';


@Component({
  selector: 'app-task',
  templateUrl: 'task.component.html'
})
@Injectable()
export class TaskComponent implements OnInit, OnDestroy {
  currentTask: string;
  private subscription: Subscription;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.subscription = observableTimer(0, 2000)
      .subscribe(() => {
        this.taskService.getCurrentTask()
          .subscribe(currentTask => this.currentTask = currentTask);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
