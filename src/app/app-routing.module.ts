import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './views/booking/booking.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'booking'
  },
  {
    path: "booking",
    component: BookingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
