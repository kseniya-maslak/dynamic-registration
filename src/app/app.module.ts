import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';
import { FormService } from './shared/form.service';
import { UserService } from './shared/user.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MockRequestInterceptor } from './shared/mock-request.interceptor';
import { AuthGuard } from './shared/auth.guard';
import { FormResolver } from './shared/form.resolver';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    FormService,
    AuthGuard,
    FormResolver,
    UserService,
    environment.mock
      ? [
          {
            provide: HTTP_INTERCEPTORS,
            useClass: MockRequestInterceptor,
            multi: true,
          },
        ]
      : [],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
