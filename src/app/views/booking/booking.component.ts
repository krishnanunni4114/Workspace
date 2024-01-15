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
  public currency: string = "AED";

  constructor(
    private bookingService: BookingService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.booking = { data: { items: [] as DataItem[] } as Data } as Booking;
    this.getBookingData();
    // this.calculatePrice(inputs.unitPrice, inputs.minutes, inputs.unitOfMeasure)
  }

  public setActiveItem(index: number) {
    this.booking.data.items.forEach((item: DataItem, i: number) => item.selected = i === index);
    this.activeIndex = index;
  }

  public setActiveSubItem(index: number) {
    this.booking.data.items[this.activeIndex].items.forEach((item: Item, i: number) => item.isPrefer = i === index);
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

  public calculatePrice(unitPrice: number, minutes: number, unitOfMeasure: string): string {
    const hours: number = minutes / 60;
    const hourlyPrice: number = unitPrice / hours;
    return `${hourlyPrice.toFixed(2)} / ${unitOfMeasure}`;
  }

}
