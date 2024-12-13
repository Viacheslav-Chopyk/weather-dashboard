import {IWeatherResponse} from '../app/models/weather-response.interface';

export const testData: IWeatherResponse = {
  coord: {
    lon: '56.78',
    lat: '12.34'
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }
  ],
  base: 'stations',
  main: {
    temp: 25.5,
    feels_like: 26,
    pressure: 1012,
    humidity: 45,
    temp_min: 25,
    temp_max: 26
  },
  visibility: 10000,
  wind: {
    speed: 3.1,
    deg: 150
  },
  clouds: {
    all: 0
  },
  dt: 1560350645,
  sys: {
    type: 1,
    id: 5122,
    message: 0.0139,
    country: 'US',
    sunrise: 1560343627,
    sunset: 1560396563
  },
  timezone: -14400,
  id: 0,
  name: 'Sample City',
  cod: 200
};
