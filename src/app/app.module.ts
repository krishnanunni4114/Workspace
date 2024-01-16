import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingComponent } from './views/booking/booking.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse' }),
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
