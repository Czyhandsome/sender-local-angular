import {TaskComponent} from '../task/task.component';
import {LoginComponent} from '../login/login.component';

export class RouteConfig {
  public static appRoutes = [
    {path: 'login', component: LoginComponent},
    {path: 'task', component: TaskComponent}
  ];
}
