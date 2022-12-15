import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MockRequestInterceptor } from './shared/mock-request.interceptor';

const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
  },
];

@NgModule({
  declarations: [RegistrationComponent],
  imports: [CommonModule, RouterModule.forChild(routes), HttpClientModule],
  providers: environment.mock
    ? [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MockRequestInterceptor,
          multi: true,
        },
      ]
    : [],
})
export class RegistrationModule {}
