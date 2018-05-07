import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {Routine} from './routine';
import {RoutineService} from './routine.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

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
    this.subscription = Observable.timer(0, 2000)
      .subscribe(() => this.routineService.getCurrentRoutine()
        .subscribe(msg => {
          if (msg.status === 1) {
            this.currentRoutines = msg.data;
          }
        }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
