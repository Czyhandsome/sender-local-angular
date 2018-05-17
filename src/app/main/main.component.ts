import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {ApiConfig} from '../config/api.config';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public senderId: string;

  constructor(private auth: AuthService) {
    this.senderId = auth.getSenderId();
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

  changeToLocal() {
    ApiConfig.changeToLocal();
  }

  changeToTest() {
    ApiConfig.changeToTest();
  }
}
