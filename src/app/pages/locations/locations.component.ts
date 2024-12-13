import { Component, OnInit } from '@angular/core';
import { IWeather } from '../../models/weather.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../../services/local/local.service';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  standalone: true,
  styleUrl: './locations.component.scss',
  imports: [
    DecimalPipe
  ],
})
export class LocationsComponent implements OnInit {
  weatherInfo: IWeather | null = null;
  toast = { show: false, message: '' };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private localService: LocalService
  ) {}

  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;
    const weatherInfo = params['weatherInfo'];
    if (!weatherInfo) {
      this.toggleToast('Weather information is missing.');
      return;
    }

    try {
      this.weatherInfo = JSON.parse(weatherInfo);
    } catch (error) {
      console.error(`Error parsing weather info: ${error}`);
      this.toggleToast('Invalid weather information provided.');
    }
  }

  back(): void {
    this.router.navigate(['']);
  }

  public favourite(): void {
    if (!this.weatherInfo) {
      this.toggleToast('Weather information is unavailable.');
      return;
    }

    try {
      const existingFavourites = this.localService.getData('favourites');
      let favourites: { lat: string; lon: string }[] = existingFavourites ? JSON.parse(existingFavourites) : [];

      const exists = favourites.some(
        (fav) => fav.lat === this.weatherInfo!.coord.lat && fav.lon === this.weatherInfo!.coord.lon
      );
      if (exists) {
        this.toggleToast('This location is already in favourites.');
        return;
      }

      if (favourites.length < 3) {
        favourites.push({ lat: this.weatherInfo.coord.lat, lon: this.weatherInfo.coord.lon });
        this.localService.saveData('favourites', JSON.stringify(favourites));
        this.toggleToast('Location added to favourites.');
      } else {
        this.toggleToast('Maximum favourites reached.');
      }
    } catch (error) {
      console.error(`Error managing favourites: ${error}`);
      this.toggleToast('Failed to update favourites.');
    }
  }

  public toggleToast(message: string): void {
    if (this.toast.show) return;
    this.toast = { show: true, message };
    setTimeout(() => {
      this.toast = { show: false, message: '' };
    }, 2000);
  }
}
