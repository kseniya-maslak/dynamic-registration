import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Form } from '../../model/form.model';
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
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ form }) => {
      this.registrationForm = form;
      this.loading$.next(false);
    });
  }

  onSubmitForm(registrationRequest: User) {
    this.loading$.next(true);
    this.userService.registerUser(registrationRequest).subscribe({
      next: () => this.router.navigate(['../welcome']).then(),
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
