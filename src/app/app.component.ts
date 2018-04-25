import {Component, Injectable} from '@angular/core';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  title = 'Hello Sender!';

  phonenumber: string;
  password: string;

  errorMsg: string;

  isAuthenticated = false;
  senderId: string;

  constructor(private auth: AuthService) {
    if (this.auth.isAuthenticated()) {
      this.isAuthenticated = true;
      this.senderId = auth.getId();
    }
  }

  doLogin() {
    this.auth.doLogin(this.phonenumber, this.password)
      .subscribe(() => {
        this.isAuthenticated = true;
        this.senderId = this.auth.getId();
        this.errorMsg = null;
      }, error => {
        console.log(JSON.stringify(error));
        this.errorMsg = '登录失败!';
      });
  }
}
