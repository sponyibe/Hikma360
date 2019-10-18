import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HalalCertificationPage } from './halal-certification.page';

describe('HalalCertificationPage', () => {
  let component: HalalCertificationPage;
  let fixture: ComponentFixture<HalalCertificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HalalCertificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HalalCertificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
