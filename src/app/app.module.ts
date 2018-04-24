import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from './auth/auth.service';
import {TaskService} from './task/task.service';
import {TaskComponent} from './task/task.component';
import {TokenInterceptor} from './auth/auth.interpretor';
import {StatusService} from './status/status.service';
import {StatusComponent} from './status/status.component';


@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    StatusComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    TaskService,
    StatusService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
