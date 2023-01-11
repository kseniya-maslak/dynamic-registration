import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RegistrationField } from '../model/registration-field.model';
import { RegistrationRequest } from '../model/registration-request.model';
import { Router } from '@angular/router';
import { RegistrationService } from '../shared/registration.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
})
export class RegistrationComponent implements OnInit {
  public loading$ = new BehaviorSubject(true);
  public registrationFields: RegistrationField[] = [];

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.registrationService.requestRegistrationFields().subscribe({
      next: registrationFields => {
        this.registrationFields = registrationFields;
      },
      error: () => {
        this.toastr.error(
          'Error occurred while downloading form. Try again later.',
          'Form not created'
        );
      },
      complete: () => {
        this.loading$.next(false);
      },
    });
  }

  onSubmitForm(registrationRequest: RegistrationRequest) {
    this.loading$.next(true);
    this.registrationService.submitRegistration(registrationRequest).subscribe({
      next: () => {
        this.router.navigate(['../welcome']).then();
      },
      error: () => {
        this.toastr.error(
          'Error occurred while submitting form. Try again later.',
          'Form not submitted'
        );
        this.loading$.next(false);
      },
    });
  }
}
