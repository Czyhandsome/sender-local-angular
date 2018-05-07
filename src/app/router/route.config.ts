import {LoginComponent} from '../login/login.component';
import {MainComponent} from '../main/main.component';

export class RouteConfig {
  public static appRoutes = [
    {path: 'login', component: LoginComponent},
    {path: 'main', component: MainComponent}
  ];
}
