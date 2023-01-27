import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { FormService } from './form.service';
import { Form } from '../model/form.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class FormResolver implements Resolve<Form> {
  constructor(
    private toastr: ToastrService,
    private formService: FormService,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Form> {
    const form = this.formService.getForm();
    return form != null
      ? of(form)
      : this.formService.requestRegistrationForm().pipe(
          catchError((error, caught) => {
            this.toastr.error(
              'Error occurred while downloading form. Try again later.',
              'Form not created'
            );
            this.router.navigate(['']).then();
            return caught;
          })
        );
  }
}
