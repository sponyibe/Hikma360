import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHalalPage } from './search-halal.page';

describe('SearchHalalPage', () => {
  let component: SearchHalalPage;
  let fixture: ComponentFixture<SearchHalalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchHalalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHalalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
