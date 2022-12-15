import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { RegistrationField } from '../shared/registration-field.model';
import { RegistrationRequest } from '../shared/registration-request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
})
export class RegistrationComponent implements OnInit {
  public loading$ = new BehaviorSubject(true);
  public registrationFields: RegistrationField[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http
      .get<RegistrationField[]>(environment.registrationFieldApi)
      .subscribe({
        next: registrationFields => {
          this.registrationFields = registrationFields;
        },
        complete: () => {
          this.loading$.next(false);
        },
      });
  }

  onSubmitForm(registrationRequest: RegistrationRequest) {
    this.http.post(environment.registrationApi, registrationRequest).subscribe({
      next: () => {
        this.router.navigate(['../welcome']).then();
      },
    });
  }
}
