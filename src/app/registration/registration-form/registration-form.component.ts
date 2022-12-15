import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RegistrationField } from '../shared/registration-field.model';
import { AbstractControl, FormGroup } from '@angular/forms';
import { GenerateFormService } from '../shared/generate-form.service';
import { RegistrationRequest } from '../shared/registration-request.model';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.less'],
})
export class RegistrationFormComponent {
  form: FormGroup = new FormGroup({});
  private _registrationFields: RegistrationField[] = [];

  @Output()
  submitForm = new EventEmitter<RegistrationRequest>();

  @Input()
  set registrationFields(registrationFields: RegistrationField[]) {
    this.form = this.formService.generateForm(registrationFields);
    this._registrationFields = registrationFields;
  }

  get registrationFields() {
    return this._registrationFields;
  }

  constructor(private formService: GenerateFormService) {}

  getErrorMessage(control: AbstractControl): string {
    return control.getError('error');
  }

  onSubmitForm() {
    this.submitForm.next(this.form.value);
  }
}
