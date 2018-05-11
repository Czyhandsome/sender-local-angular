import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Routine} from './routine';
import {RoutineService} from './routine.service';
import {Subscription, timer} from 'rxjs';
import {isSuccess} from '../entity/generic-msg';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
@Injectable()
export class RoutineComponent implements OnInit, OnDestroy {
  // 当前Routine
  currentRoutines: Array<Routine>;

  private subscription: Subscription;

  constructor(private routineService: RoutineService) {
  }

  ngOnInit() {
    this.subscription = timer(0, 2000)
      .subscribe(() => this.routineService.getCurrentRoutine()
        .subscribe(msg => {
          if (isSuccess(msg)) {
            this.currentRoutines = msg.data;
          } else {
            console.error('获取快递员行程失败!');
          }
        }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
