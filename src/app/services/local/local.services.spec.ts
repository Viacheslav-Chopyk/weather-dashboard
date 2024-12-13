import { TestBed } from '@angular/core/testing';
import { LocalService } from './local.service';

describe('LocalService', () => {
  let service: LocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalService]
    });
    service = TestBed.inject(LocalService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should remove data from localStorage', () => {
    const key = 'testKey';
    const value = 'testValue';

    service.saveData(key, value);
    service.removeData(key);
    const retrievedValue = service.getData(key);

    expect(retrievedValue).toBeNull();
  });

  it('should clear all data from localStorage', () => {
    const key1 = 'testKey1';
    const value1 = 'testValue1';
    const key2 = 'testKey2';
    const value2 = 'testValue2';

    service.saveData(key1, value1);
    service.saveData(key2, value2);

    service.clearData();

    expect(service.getData(key1)).toBeNull();
    expect(service.getData(key2)).toBeNull();
  });
});
