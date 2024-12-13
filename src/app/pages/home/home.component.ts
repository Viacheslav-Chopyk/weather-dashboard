import {Component, OnInit} from '@angular/core';
import cities from 'cities.json';
import {ICity} from '../../models/city-weather.interface';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';
import {LocalService} from '../../services/local/local.service';
import {DecimalPipe, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DecimalPipe,
    TitleCasePipe
  ],
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  weatherForm: any;
  searchResults: ICity[] = [];
  favouriteLocations: any[] = [];
  formSubmitted: boolean = false;
  errorMessage: string | null = null;
  citiesArray: any = cities;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private weatherService: WeatherService,
    private localService: LocalService,
  ) {
    this.weatherForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(2)]],
    });

    const cityControl = this.weatherForm.get('city');
    if (cityControl) {
      cityControl.valueChanges.subscribe((cityValue: string) => {
        if (cityValue && cityValue.length > 1) {
          this.filterSearchQuery(cityValue);
        } else {
          this.searchResults = [];
        }
      });
    }
  }

  ngOnInit(): void {
    this.loadFavouriteLocations();
  }

  private loadFavouriteLocations() {
    const favouritesData = this.localService.getData('favourites');
    const existingFavourites = favouritesData ? JSON.parse(favouritesData) : [];
    if (existingFavourites.length > 0) {
      existingFavourites.forEach((city: { lat: string; lon: string }) => {
        this.weatherService.getWeatherInfo(city.lat, city.lon).subscribe({
          next: (res) => {
            this.favouriteLocations.push(res);
          },
          error: () => {
            this.errorMessage = 'Failed to load favourite locations.';
          },
        });
      });
    }
  }

  public updateSearchQuery() {
    const searchedCity = this.weatherForm?.value?.city?.trim();

    if (!searchedCity || searchedCity.length < 3) {
      this.searchResults = [];
      this.formSubmitted = false;
      return;
    }

    this.searchResults = this.citiesArray.filter((city: { name: string }) =>
      city.name.toLowerCase().includes(searchedCity.toLowerCase())
    );
    this.formSubmitted = true;
  }

  public filterSearchQuery(searchedCity: string) {
    this.searchResults = this.citiesArray.filter((city: { name: string }) =>
      city.name.toLowerCase().includes(searchedCity.toLowerCase())
    );
  }

  public getWeatherDetails(lat: string, lng: string) {
    this.weatherService.getWeatherInfo(lat, lng).subscribe({
      next: (res) => {
        this.router.navigate(['location'], { queryParams: { weatherInfo: JSON.stringify(res) } });
      },
      error: () => {
        this.errorMessage = 'Failed to fetch weather details.';
      },
    });
  }

  public deleteFavourite(index: number) {
    if (index >= 0 && index < this.favouriteLocations.length) {
      this.favouriteLocations.splice(index, 1);

      const favouritesData = this.localService.getData('favourites');
      const existingFavourites = favouritesData ? JSON.parse(favouritesData) : [];
      existingFavourites.splice(index, 1);
      this.localService.saveData('favourites', JSON.stringify(existingFavourites));
    }
  }
}
