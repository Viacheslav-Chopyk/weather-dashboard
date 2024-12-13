import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'direction'
})
export class DirectionPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    const index = Math.round(value / 45) % 8;
    return directions[index];
  }

}
