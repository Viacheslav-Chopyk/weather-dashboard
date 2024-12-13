import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { testData } from '../../../testing/test-data';
import { LocalService } from '../../services/local/local.service';
import { LocationsComponent } from './locations.component';

const mockActivatedRoute = {
  queryParams: of({ weatherInfo: JSON.stringify(testData) })
};

const mockLocalService = {
  getData: jasmine.createSpy('getData').and.returnValue(null),
  saveData: jasmine.createSpy('saveData')
};

describe('LocationsComponent', () => {
  let component: LocationsComponent;
  let injectedService: LocalService;

  beforeEach(() => {
    jasmine.clock().install();

    TestBed.configureTestingModule({
      declarations: [],
      imports: [LocationsComponent],
      providers: [
        LocationsComponent,
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: LocalService, useValue: mockLocalService }
      ]
    });

    component = TestBed.inject(LocationsComponent);
    injectedService = TestBed.inject(LocalService);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not have weatherInfo after construction', () => {
    expect(component.weatherInfo).toBeNull();
  });

  // it('should add location to favorites if not exceeding limit', () => {
  //   component.weatherInfo = testData;
  //   component.favourite();
  //   expect(injectedService.getData).toHaveBeenCalledWith('favourites');
  //   expect(injectedService.saveData).toHaveBeenCalledWith('favourites', JSON.stringify([{ lat: component.weatherInfo.coord.lat, lon: component.weatherInfo.coord.lon }]));
  //   expect(component.toast.message).toBe('Location added to favourites');
  // });
  //
  // it('should show maximum favorites reached message', () => {
  //   spyOn(component, 'toggleToast');
  //   component.favourite();
  //   expect(injectedService.getData).toHaveBeenCalledWith('favourites');
  //   expect(component.toggleToast).toHaveBeenCalledWith('Maximum favourites reached');
  // });

  it('should toggle the toast message and show it for 2 seconds', () => {
    component.toggleToast('Test message');
    expect(component.toast.message).toBe('Test message');
    expect(component.toast.show).toBe(true);
    jasmine.clock().tick(2001);
    expect(component.toast.show).toBe(false);
  });
});
