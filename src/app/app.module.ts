import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from './auth/auth.service';
import {TaskService} from './task/task.service';
import {TaskComponent} from './task/task.component';
import {StatusService} from './status/status.service';
import {StatusComponent} from './status/status.component';
import {FormsModule} from '@angular/forms';
import {AuthInterceptor} from './auth/auth.interceptor';
import {RouterModule} from '@angular/router';
import {RouteConfig} from './config/route.config';
import {LoginComponent} from './login/login.component';
import {RouterService} from './router/router.service';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    StatusComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      RouteConfig.appRoutes
    )
  ],
  providers: [
    AuthService,
    TaskService,
    StatusService,
    RouterService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
