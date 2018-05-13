import {Component, Injectable, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable()
export class LoginComponent implements OnInit {

  phonenumber: string;
  password: string;

  errorMsg: string;

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  doLogin() {
    this.auth.doLogin(this.phonenumber, this.password)
      .subscribe(() => {
        this.router.navigateByUrl('/main');
      }, error => {
        console.log(JSON.stringify(error));
        this.errorMsg = '登录失败!';
      });
  }
}
