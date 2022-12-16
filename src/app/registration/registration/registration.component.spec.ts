import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { RegistrationField } from '../shared/registration-field.model';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import {
  Component,
  EventEmitter,
  Injectable,
  Input,
  Output,
} from '@angular/core';
import { RegistrationService } from '../shared/registration.service';
import { first, Subject } from 'rxjs';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistrationRequest } from '../shared/registration-request.model';
import { MatProgressBarHarness } from '@angular/material/progress-bar/testing';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ToastrService } from 'ngx-toastr';

let fields$: Subject<RegistrationField[]>;
let response$: Subject<null>;

@Injectable()
class MockRegistrationService {
  requestRegistrationFields() {
    return fields$.pipe(first());
  }

  submitRegistration() {
    return response$.pipe(first());
  }
}
@Injectable()
class MockToastrService {
  error() {}
}

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
  registrationFields: RegistrationField[] = [];

  @Output()
  submitForm = new EventEmitter<RegistrationRequest>();
}

const mock: RegistrationField[] = [
  {
    type: 'phone',
    name: 'phone_number',
    label: 'Mobile number',
    required: true,
    validations: [
      {
        name: 'regex',
        message: 'Only numbers are allowed.',
        value: '^[0-9]+$',
      },
      {
        name: 'maxlength',
        message: 'Must be less than 47 characters.',
        value: 10,
      },
      {
        name: 'minlength',
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
    await TestBed.configureTestingModule({
      imports: [
        MatProgressBarModule,
        RouterTestingModule.withRoutes([
          { path: 'welcome', component: DummyComponent },
        ]),
      ],
      declarations: [RegistrationComponent, MockRegistrationFormComponent],
      providers: [
        {
          provide: RegistrationService,
          useClass: MockRegistrationService,
        },
        {
          provide: ToastrService,
          useClass: MockToastrService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationComponent);
    location = TestBed.inject(Location);
    toastrService = TestBed.inject(ToastrService);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fields$ = new Subject();
    response$ = new Subject();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader', async () => {
    let spinner = await loader.hasHarness(MatProgressBarHarness);
    expect(spinner).toBeTruthy();
    fields$.next(mock);
    spinner = await loader.hasHarness(MatProgressBarHarness);
    expect(spinner).toBeFalsy();
  });

  it('should show error on failed form request', async () => {
    spyOn(toastrService, 'error');
    fields$.error('Some error');
    let spinner = await loader.hasHarness(MatProgressBarHarness);
    expect(spinner).toBeTruthy();
    expect(toastrService.error).toHaveBeenCalled();
  });

  it('should navigate to welcome on success submit', fakeAsync(() => {
    component.onSubmitForm({});
    expect(location.path()).toEqual('');
    response$.next(null);
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
