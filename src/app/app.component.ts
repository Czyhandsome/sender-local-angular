import {Component, Injectable} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {RouterService} from './router/router.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  title = 'Hello Sender';

  constructor(private auth: AuthService,
              private router: RouterService) {
    if (this.auth.isAuthenticated()) {
      this.router.jumpTo('/task');
    } else {
      this.router.jumpTo('/login');
    }
  }
}
