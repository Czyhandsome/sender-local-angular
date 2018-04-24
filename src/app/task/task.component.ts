import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from './task.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

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
    this.subscription = Observable.timer(1000, 2000)
      .subscribe(() => {
        this.taskService.getCurrentTask()
          .subscribe(currentTask => this.currentTask = currentTask);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
