import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {StatusService} from './status.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
@Injectable()
export class StatusComponent implements OnInit, OnDestroy {
  currentStatus: string;
  private subscription: Subscription;

  public changeStatus() {
    if (this.currentStatus === 'RESTING') {
      this.statusService.beReady()
        .subscribe(() => this.refreshStatus());
    } else if (this.currentStatus === 'READY') {
      this.statusService.beResting()
        .subscribe(() => this.refreshStatus());
    }
  }

  constructor(private statusService: StatusService) {
    this.refreshStatus();
  }

  private refreshStatus() {
    this.statusService.getCurrentStatus()
      .subscribe(status => this.currentStatus = status);
  }

  ngOnInit() {
    this.subscription = Observable.timer(1000, 2000)
      .subscribe(() => this.refreshStatus());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
