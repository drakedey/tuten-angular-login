import { Injectable } from '@angular/core';
import { DataproviderService } from '../http/dataprovider.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginSubject = new Subject<any>();
  currentUser: any;
  constructor(
    private dataProvider: DataproviderService,
    ) {
      this.currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;
    }
    
  logginUser(email, password): any {
    this.dataProvider.doLoggin(email, password)
    .subscribe( response => {
      const { error } = response;
      if(error) {
        this.loginSubject.next({ status: false, error });
        localStorage.setItem('currentUser',  null);
      } else {
        console.log(response);
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.loginSubject.next({ status: true })
      }
    });
    return this.getCurrentUserValue();
  }

  getCurrentUserValue(): any {
    return this.currentUser;
  }

  logout(): void {
    if(this.getCurrentUserValue()) {
      localStorage.removeItem('currentUser');
    }
  }

  onLoggin(): Observable<any> {
    return this.loginSubject.asObservable();
  }
}
