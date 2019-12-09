import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSearchPage } from './image-search.page';

describe('ImageSearchPage', () => {
  let component: ImageSearchPage;
  let fixture: ComponentFixture<ImageSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
