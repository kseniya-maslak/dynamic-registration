import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RegistrationField } from '../shared/registration-field.model';
import { RegistrationRequest } from '../shared/registration-request.model';
import { Router } from '@angular/router';
import { RegistrationService } from '../shared/registration.service';

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
    private router: Router
  ) {}

  ngOnInit() {
    this.registrationService.requestRegistrationFields().subscribe({
      next: registrationFields => {
        this.registrationFields = registrationFields;
      },
      complete: () => {
        this.loading$.next(false);
      },
    });
  }

  onSubmitForm(registrationRequest: RegistrationRequest) {
    this.registrationService.submitRegistration(registrationRequest).subscribe({
      next: () => {
        this.router.navigate(['../welcome']).then();
      },
      error: () => {},
    });
  }
}
