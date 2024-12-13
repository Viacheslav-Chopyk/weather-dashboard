import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {WeatherService} from './weather.service';
import {IWeatherResponse} from '../../models/weather-response.interface';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weather data successfully', () => {
    const mockResponse: IWeatherResponse = {
      coord: { lon: '30.5', lat: '50.5' },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
      base: 'stations',
      main: { temp: 298.15, feels_like: 298.15, temp_min: 297.15, temp_max: 299.15, pressure: 1012, humidity: 50 },
      visibility: 10000,
      wind: { speed: 4.1, deg: 310 },
      clouds: { all: 0 },
      dt: 1624041600,
      sys: {
        type: 1, id: 1234, country: 'UA', sunrise: 1623987600, sunset: 1624045200,
        message: 0
      },
      timezone: 10800,
      id: 123456,
      name: 'Kyiv',
      cod: 200
    };

    const lat = '50.5';
    const lng = '30.5';

    service.getWeatherInfo(lat, lng).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}?lat=${lat}&lon=${lng}&appid=${service['apiKey']}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle an error response', () => {
    const lat = 'invalid_lat';
    const lng = 'invalid_lng';
    const errorMessage = 'Failed to fetch weather data. Please try again.';

    service.getWeatherInfo(lat, lng).subscribe({
      next: () => fail('Expected an error, not a successful response'),
      error: (error) => {
        expect(error.message).toBe(errorMessage);
      }
    });

    const req = httpMock.expectOne(`${service['baseUrl']}?lat=${lat}&lon=${lng}&appid=${service['apiKey']}`);
    expect(req.request.method).toBe('GET');
    req.flush(
      { message: 'Invalid coordinates' },
      { status: 400, statusText: 'Bad Request' }
    );
  });
});
