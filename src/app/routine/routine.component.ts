import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Routine} from './routine';
import {RoutineService} from './routine.service';
import {Subscription, timer} from 'rxjs';
import {isSuccess} from '../entity/generic-msg';
import {AuthService} from '../auth/auth.service';

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

  constructor(private routineService: RoutineService,
              private auth: AuthService) {
  }

  ngOnInit() {
    this.subscription = timer(0, 2000)
      .subscribe(() => this.updateRoutine());
  }

  private updateRoutine() {
    this.routineService.getCurrentRoutine()
      .subscribe(msg => {
        if (isSuccess(msg)) {
          this.currentRoutines = msg.data;
        } else {
          console.error('获取快递员行程失败!');
        }
      });
  }

  hasRoutine() {
    return this.currentRoutines && this.currentRoutines.length > 0;
  }

  createRoutine() {
    this.routineService.publishRoutine(this.auth.getSenderId())
      .subscribe(msg => {
        if (isSuccess(msg)) {
          alert(`发布行程成功! ${JSON.stringify(msg.data)}`);
          this.updateRoutine();
        } else {
          alert(`发布行程失败! ${msg.msg}`);
        }
      }, error => {
        alert(`发布行程失败! ${JSON.stringify(error)}`);
      });
  }

  cancelRoutine(routineId: string) {
    this.routineService.cancelRoutine(this.auth.getSenderId(), routineId)
      .subscribe(msg => {
        if (isSuccess(msg)) {
          alert(`取消行程成功! ${msg.data}`);
        } else {
          alert(`取消行程失败! ${msg.msg}`);
        }
      }, error => {
        alert(`发布行程失败! ${JSON.stringify(error)}`);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
