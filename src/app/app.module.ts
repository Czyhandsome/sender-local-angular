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


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    TaskService,
    StatusService,
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
