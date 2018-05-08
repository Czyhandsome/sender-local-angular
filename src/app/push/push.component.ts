import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {PushService} from './push.service';

@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.css']
})
@Injectable()
export class PushComponent implements OnInit, OnDestroy {

  constructor(private push: PushService) {
  }

  ngOnInit() {
    this.push.connect();
  }

  ngOnDestroy() {
    this.push.disconnect();
  }

}
