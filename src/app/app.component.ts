import {Component, Injectable} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  title = 'Hello Sender';

  constructor(private auth: AuthService,
              private router: Router) {
    if (this.isAuthenticated()) {
      this.router.navigateByUrl('/main');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }
}
