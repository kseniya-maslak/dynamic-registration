import { TestBed } from '@angular/core/testing';

import { FormResolver } from './form.resolver';
import { FormService } from './form.service';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable()
class MockToastrService {
  error() {}
}

describe('FormResolver', () => {
  let resolver: FormResolver;

  beforeEach(() => {
    const formService = jasmine.createSpyObj('FormService', [
      'requestRegistrationForm',
    ]);
    TestBed.configureTestingModule({
      providers: [
        FormResolver,
        { provide: ToastrService, useClass: MockToastrService },
        { provide: FormService, useValue: formService },
      ],
    });
    resolver = TestBed.inject(FormResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
