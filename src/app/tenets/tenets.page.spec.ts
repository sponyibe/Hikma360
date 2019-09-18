import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenetsPage } from './tenets.page';

describe('TenetsPage', () => {
  let component: TenetsPage;
  let fixture: ComponentFixture<TenetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenetsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
