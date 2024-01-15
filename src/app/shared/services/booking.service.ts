import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Booking, DataItem } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient: HttpClient) { }

  public getBookingData(): Observable<Booking> {
    return this.httpClient.get<Booking>(`${environment.apiUrl}/sampleTestData`).pipe(map((booking: Booking) => {
      return { ...booking, data: { ...booking.data, items: booking.data.items?.map((item: DataItem) => ({ ...item, items: item.items?.sort((a, b) => a.sort - b.sort) })).sort((a, b) => a.displayOrder - b.displayOrder) } }
    }));
  }
}
