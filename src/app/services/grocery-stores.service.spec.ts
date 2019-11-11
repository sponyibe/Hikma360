import { TestBed } from '@angular/core/testing';

import { GroceryStoresService } from './grocery-stores.service';

describe('GroceryStoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GroceryStoresService = TestBed.get(GroceryStoresService);
    expect(service).toBeTruthy();
  });
});
