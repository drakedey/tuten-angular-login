import { Component, OnInit, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/authentication/auth-service.service';
import { DataproviderService } from 'src/app/core/http/dataprovider.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { Observable, Subscription } from 'rxjs';
import { Booking } from 'src/app/shared/models/bookings.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {

  userLogged: User;
  unmodifiedBookingData: any;
  bookingDataFiletered: Booking[];
  bookingDataSubscription = new Subscription();
  filterForm: FormGroup;
  defaultEmailValue: string;
  searching = false;
  errorObj = { status: false, message: '' };
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder:  FormBuilder,
    private dataProviderService: DataproviderService,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    }

  ngOnInit() {
   console.log('init');
   this.getCurrentUser();
   this.setAndFillForm();
   this.fetchBookingData();
  }

  ngOnDestroy() {
    this.bookingDataSubscription.unsubscribe();
  }

  setAndFillForm(): void {
    this.defaultEmailValue = 'contacto@tuten.cl';
    this.filterForm = this.formBuilder.group({
      emailContacto: ['', Validators.required],
      bookingId: [''],
      minPrice: [''],
      maxPrice: ['']
    });
    this.filterForm.get('emailContacto').setValue(this.defaultEmailValue);
  }

  onFiltered(): void {
    this.filterData(this.unmodifiedBookingData);
  }


  getCurrentUser(): void {
    this.userLogged = this.authService.getCurrentUserValue();
    if(!this.userLogged)  this.router.navigate(['/login']);
  }

  fetchBookingData(): void {
    this.searching = true;
    const emailContacto = this.filterForm.get('emailContacto').value;
    const subs = this.dataProviderService.getBookingData(emailContacto)
    .subscribe( data => {
      this.searching = true;
      this.unmodifiedBookingData = data;
      this.filterData(this.unmodifiedBookingData);
      this.searching = false;
      this.changeDetectorRef.detectChanges();
    });
    this.bookingDataSubscription.add(subs);
  }

  onFormSubmit(event: any): void {
    this.fetchBookingData();
  }

  filterData(unmodifiedBookings: any): void {
    console.log('filtering');
    this.errorObj.status = false;
    const checkEmpty = (value) => value !== '' && value !== null && value !== undefined;
    this.bookingDataFiletered = unmodifiedBookings.map(bookingEl => {
      return new Booking(bookingEl);
    });
    //Filtering by bookingId
    const bookingIdFilter = this.filterForm.get('bookingId').value;
    console.log(checkEmpty(bookingIdFilter))
    if (checkEmpty(bookingIdFilter)) {
      console.log('on id');
      this.bookingDataFiletered = this.bookingDataFiletered.filter(bookingEl => {
        const { bookingId } = bookingEl;
        console.log(bookingId.toString().indexOf(bookingIdFilter))
        return bookingId.toString().indexOf(bookingIdFilter.toString()) >= 0
      });
    }

    //Filtering by price range
    const minPriceFilter = this.filterForm.get('minPrice').value;
    const maxPriceFilter = this.filterForm.get('maxPrice').value;
    const emptyCondition = checkEmpty(minPriceFilter) && checkEmpty(maxPriceFilter);
    const minAndMaxCondition = minPriceFilter < maxPriceFilter;
    if (emptyCondition && minAndMaxCondition) {
      this.bookingDataFiletered = this.bookingDataFiletered.filter(bookingEl => {
        const { bookingPrice } = bookingEl;
        return bookingPrice > minPriceFilter && bookingPrice < maxPriceFilter;
      });
    } else if ((this.filterForm.get('minPrice').touched || this.filterForm.get('maxPrice').touched) && !minAndMaxCondition) {
      console.log('gere');
      this.errorObj = {
        status: true,
        message: 'Max Price no puede ser mayor que min price'
      }
    }
    this.changeDetectorRef.detectChanges();
  }

  


}
