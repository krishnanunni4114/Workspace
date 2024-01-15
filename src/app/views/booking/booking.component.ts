import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Booking, Data, DataItem, Item } from 'src/app/shared/models/booking.model';
import { BookingService } from 'src/app/shared/services/booking.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  public booking!: Booking;
  public activeIndex: number = 0;

  constructor(
    private bookingService: BookingService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.booking = { data: { items: [] as DataItem[] } as Data } as Booking;
    this.getBookingData();
  }

  public setActiveItem(index: number) {
    this.booking.data.items.forEach((item: DataItem, i: number) => item.selected = i === index);
    this.activeIndex = index;
  }

  private getBookingData() {
    this.bookingService.getBookingData().subscribe({
      next: (booking: Booking) => {
        if (booking.data.items.length > 0) booking.data.items[0].selected = true;
        this.booking = booking;
      },
      error: (error: HttpErrorResponse) => {
        this.commonService.setToastr(error.status, error.message);
      }
    });
  }


  public getItems(): Item[] {
    if (this.booking.data.items.length > 0) {
      return this.booking.data.items[this.activeIndex].items;
    } else {
      return [];
    }
  }
}
