import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CONFIG } from 'src/app/shared/configs/config';
import { Booking, Data, DataItem, Item, OrderSummary } from 'src/app/shared/models/booking.model';
import { Config } from 'src/app/shared/models/domain.model';
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
  public orderSummary!: OrderSummary;
  public config: Config = CONFIG;
  public isLoading: boolean = true;
  public showSummary: boolean = true;
  public currentDate: string = "";

  constructor(
    private bookingService: BookingService,
    private commonService: CommonService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.currentDate = this.getDate(new Date());
    this.booking = { status: "", data: { fromDate: "", toDate: "", endDate: false, title: "", itemTitle: "", items: [] as DataItem[] } as Data } as Booking;
    this.orderSummary = { count: 0, itemName: '0 hours', total: 0, grandTotal: 0 } as OrderSummary;
    this.getBookingData();
  }

  public setActiveItem(index: number) {
    this.booking.data.items.forEach((item: DataItem, i: number) => item.selected = i === index);
    this.activeIndex = index;
    this.setActiveSubItem(this.booking.data.items[index].items[0], 0);
  }

  public setActiveSubItem(item: Item, index: number) {
    this.booking.data.items[this.activeIndex]?.items.forEach((item: Item, i: number) => item.isPrefer = i === index);
    this.orderSummary = this.getOrderSummary(item);
  }

  private getOrderSummary(item: Item): OrderSummary {
    return {
      itemName: item.itemName,
      total: item.unitPrice,
      grandTotal: this.commonService.calculateVatAmount(item.unitPrice, this.config.vatPercentage)
    } as OrderSummary;
  }

  private getDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || "" ;
  }

  public setEndDate(event: any) {
    const checked: boolean = event.target.checked;
    if (checked) {
      this.booking.data.toDate = this.booking.data.fromDate;
    } else {
      this.booking.data.toDate = "";
    }
  }

  public patchEndDate(event: any): void {
    const fromDate: string = event.target.value;
    const toDate: string = this.booking.data.toDate;
    if (fromDate > toDate) {
      this.booking.data.toDate = fromDate;
    }
  }

  public calculateHourlyPrice(unitPrice: number, minutes: number, unitOfMeasure: string): string {
    const hours: number = minutes / 60;
    const pricePerHour: number = unitPrice / hours;
    return `${pricePerHour.toFixed(2)} / ${unitOfMeasure}`;
  }

  private getBookingData() {
    this.bookingService.getBookingData().subscribe({
      next: (booking: Booking) => {
        if (booking.status === "success") {
          this.handleSuccess(booking);
        } else {
          this.commonService.setToastr(500, "Oops! No slots are available for this service.");
        }
      },
      error: (error: HttpErrorResponse) => {
        this.commonService.setToastr(error.status, error.message);
      },
    });
  }

  private handleSuccess(booking: Booking) {
    if (booking.data?.items?.length > 0) {
      booking.data.items[0].selected = true;
      const subItems: Item[] = booking.data.items[0].items;
      if (subItems.length > 0) {
        const preferredSubItem = subItems.find(item => item.isPrefer);
        if (preferredSubItem) {
          this.orderSummary = this.getOrderSummary(preferredSubItem);
        }
      }
      this.isLoading = false;
    }
    booking.data.fromDate = this.getDate(new Date());
    this.booking = booking;
  }

  public bookService(): void {
    if (this.booking.status === "success") {
      const selectedItem = this.booking.data.items.find(item => item.selected);
      if (selectedItem) {
        if (!this.booking.data.fromDate) {
          this.commonService.setToastr(401, "Choose a date to confirm your booking.");
          return;
        } else if (this.booking.data.fromDate && this.booking.data.endDate && !this.booking.data.toDate) {
          this.commonService.setToastr(401, "Choose a to date to confirm your booking.");
          return;
        }
        const selectedSubItem = this.booking.data.items[this.activeIndex]?.items.find(item => item.isPrefer);
        if (selectedSubItem) {
          // Other function implementation
          this.commonService.setToastr(200, `Congratulations! Your booking for "${selectedItem.count} Cleaner, ${selectedSubItem.itemName}" cleaning service has been confirmed.`);
        } else {
          this.commonService.setToastr(401, "Please select a desired time slot to confirm your booking.");
        }
      } else {
        this.commonService.setToastr(401, "Please select the number of cleaners you want.");
      }
    } else {
      this.commonService.setToastr(500, "Oops! There seems to be an error. Please try again later.");
    }
  }
}
