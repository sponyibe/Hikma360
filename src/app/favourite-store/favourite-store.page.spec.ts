import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteStorePage } from './favourite-store.page';

describe('FavouriteStorePage', () => {
  let component: FavouriteStorePage;
  let fixture: ComponentFixture<FavouriteStorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteStorePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteStorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
