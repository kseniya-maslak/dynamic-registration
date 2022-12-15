import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MockRequestInterceptor } from './shared/mock-request.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { GenerateFormService } from './shared/generate-form.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
  },
];

@NgModule({
  declarations: [RegistrationComponent, RegistrationFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  providers: [
    GenerateFormService,
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
})
export class RegistrationModule {}
