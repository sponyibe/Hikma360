import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryStoresPage } from './grocery-stores.page';

describe('GroceryStoresPage', () => {
  let component: GroceryStoresPage;
  let fixture: ComponentFixture<GroceryStoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryStoresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryStoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
