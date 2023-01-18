import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Form } from '../../model/form.model';
import { FormService } from '../../shared/form.service';
import { User } from '../../model/user.model';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less'],
})
export class RegistrationComponent implements OnInit {
  public loading$ = new BehaviorSubject(true);
  public registrationForm: Form = new Form([]);

  constructor(
    private formService: FormService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.formService.requestRegistrationForm().subscribe({
      next: form => {
        this.registrationForm = form;
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

  onSubmitForm(registrationRequest: User) {
    this.loading$.next(true);
    this.userService.registerUser(registrationRequest).subscribe({
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
