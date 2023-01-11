import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormComponent } from './registration-form.component';
import { GenerateFormService } from '../shared/generate-form.service';
import { Directive, Injectable, Input } from '@angular/core';
import { RegistrationField } from '../model/registration-field.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatInputModule } from '@angular/material/input';
import { MatInputHarness } from '@angular/material/input/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonHarness } from '@angular/material/button/testing';
import { SupportedValidatorsEnum } from '../model/supported-validators.enum';
import { SupportedFieldTypesEnum } from '../model/supported-field-types.enum';

let mockFormGroup: FormGroup;

const mock: RegistrationField[] = [
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

@Injectable()
class MockGenerateFormService {
  generateForm() {
    return mockFormGroup;
  }
}

@Directive({ selector: 'input[appPasswordToggle]' })
// eslint-disable-next-line @angular-eslint/directive-class-suffix
class MockAppPasswordToggle {
  @Input('appPasswordToggle') apply = true;
}

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatInputModule, NoopAnimationsModule, ReactiveFormsModule],
      declarations: [RegistrationFormComponent, MockAppPasswordToggle],
      providers: [
        { provide: GenerateFormService, useClass: MockGenerateFormService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    mockFormGroup = new FormGroup({
      phone_number: new FormControl(''),
    });
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form with fields', async () => {
    component.registrationFields = mock;
    const field = await loader.getHarness(
      MatInputHarness.with({ selector: '#phone_number-field' })
    );
    expect(field).toBeTruthy();
  });

  it('should create form with fields', async () => {
    component.registrationFields = mock;
    component.form.controls['phone_number'].setErrors({ error: 'Some error' });
    expect(
      component.getErrorMessage(component.form.controls['phone_number'])
    ).toBe('Some error');
  });

  it('should submit form value on submit', async () => {
    component.registrationFields = mock;
    component.form.setValue({ phone_number: '123456' });
    component.submitForm.subscribe(next => {
      expect(next).toEqual({ phone_number: '123456' });
    });
    const button = await loader.getHarness(
      MatButtonHarness.with({ selector: '#submit-registration-form' })
    );
    await button.click();
  });
});
