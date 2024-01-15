import { Injectable } from '@angular/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr: ToastrService) { }

  public setToastr(status: number, message: string) {
    switch (status) {
      case 200:
        this.toastr.success(message, 'Success');
        break;
      case 400:
        this.toastr.warning(message, 'Warning');
        break;
      case 401:
        this.toastr.info(message, 'Info');
        break;
      default:
        this.toastr.error(message, 'Error');
        break;
    }
  }
}
