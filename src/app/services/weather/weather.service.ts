import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {IWeatherResponse} from '../../models/weather-response.interface';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = 'ad8f66800404796c9d3a57663042cacf';

  constructor(private http: HttpClient) {}

  getWeatherInfo(lat: string, lng: string): Observable<IWeatherResponse> {
    return this.http.get<IWeatherResponse>(`${this.baseUrl}?lat=${lat}&lon=${lng}&appid=${this.apiKey}`).pipe(
      catchError((error) => {
        console.error('Error fetching weather data:', error);
        return throwError(() => new Error('Failed to fetch weather data. Please try again.'));
      })
    );
  }
}
