import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { Field } from '../../model/field.model';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  Output,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from '../../model/user.model';
import { MatProgressBarHarness } from '@angular/material/progress-bar/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ToastrService } from 'ngx-toastr';
import { SupportedFieldTypesEnum } from '../../model/supported-field-types.enum';
import { SupportedValidatorsEnum } from '../../model/supported-validators.enum';
import { UserService } from '../../shared/user.service';
import { Form } from '../../model/form.model';
import { ActivatedRoute } from '@angular/router';

let form$: Subject<{ form: Form }>;
let response$: Subject<User>;

@Component({
  template: '',
})
class DummyComponent {}

@Component({
  selector: 'app-registration-form',
  template: '',
})
class MockRegistrationFormComponent {
  @Input()
  registrationFields: Field[] = [];

  @Output()
  submitForm = new EventEmitter<User>();
}
@Injectable()
class MockUserService {
  registerUser(): Observable<User> {
    return response$;
  }
}

@Injectable()
class MockToastrService {
  error() {}
}

const mock: Field[] = [
  {
    type: SupportedFieldTypesEnum.PHONE,
    name: 'phone_number',
    label: 'Mobile number',
    required: true,
    validations: [
      {
        name: SupportedValidatorsEnum.REGEX,
        message: 'Only numbers are allowed.',
        value: '^[0-9]+$',
      },
      {
        name: SupportedValidatorsEnum.MAXLENGTH,
        message: 'Must be less than 47 characters.',
        value: 10,
      },
      {
        name: SupportedValidatorsEnum.MINLENGTH,
        message: 'Must not be less than 4 characters.',
        value: 4,
      },
    ],
  },
];
describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let loader: HarnessLoader;
  let location: Location;
  let toastrService: ToastrService;

  beforeEach(async () => {
    form$ = new Subject();
    response$ = new Subject<User>();
    await TestBed.configureTestingModule({
      imports: [
        MatProgressBarModule,
        RouterTestingModule.withRoutes([
          { path: 'welcome', component: DummyComponent },
        ]),
      ],
      declarations: [RegistrationComponent, MockRegistrationFormComponent],
      providers: [
        { provide: ToastrService, useClass: MockToastrService },
        { provide: UserService, useClass: MockUserService },
        { provide: ActivatedRoute, useValue: { data: form$ } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    location = TestBed.inject(Location);
    toastrService = TestBed.inject(ToastrService);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader', async () => {
    let spinner = await loader.hasHarness(MatProgressBarHarness);
    expect(spinner).toBeTruthy();
    form$.next({ form: new Form(mock) });
    spinner = await loader.hasHarness(MatProgressBarHarness);
    expect(spinner).toBeFalsy();
  });

  it('should navigate to welcome on success submit', fakeAsync(() => {
    component.onSubmitForm({});
    expect(location.path()).toEqual('');
    response$.next({});
    tick();
    expect(location.path()).toEqual('/welcome');
  }));

  it('should not navigate on failed submit', fakeAsync(() => {
    spyOn(toastrService, 'error');
    component.onSubmitForm({});
    expect(location.path()).toEqual('');
    response$.error({});
    tick();
    expect(location.path()).toEqual('');
    expect(toastrService.error).toHaveBeenCalled();
  }));
});
