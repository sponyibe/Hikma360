import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterGroceryStoresPage } from './filter-grocery-stores.page';

describe('FilterGroceryStoresPage', () => {
  let component: FilterGroceryStoresPage;
  let fixture: ComponentFixture<FilterGroceryStoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterGroceryStoresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterGroceryStoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
