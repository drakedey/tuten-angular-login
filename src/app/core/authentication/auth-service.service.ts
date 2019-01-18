import { Injectable } from '@angular/core';
import { DataproviderService } from '../http/dataprovider.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private dataProvider: DataproviderService) {
  }

  /**
   * Function in charge of perform login to the app.
   * @param username string. of the username as "its primary key"
   * @param password string. passwotrd of the user.
   */
  LoggingUser(username: string, password: string): any {
    const user = this.dataProvider.users.find( u => u.username === username && u.password === password);
    if (user === undefined) {
      localStorage.setItem('isLogged', 'false');
      localStorage.removeItem('username');
      return {
        success: false,
        message: 'Your credentials doesn\'t match our records'
      };
    } else {
      if (!user.validity) {
        localStorage.setItem('isLogged', 'false');
        localStorage.removeItem('username');
        return {
          success: false,
          message: 'There\'re problems with your credentials. Contact to the admin of the page'
        };
      } else {
        localStorage.setItem('isLogged', 'true');
        localStorage.setItem('username', user.username);
        return {
          success: true,
          message: ''
        };
      }
    }
  }

  /**
   * Function in charge of clean the localStorage
   */
  Logout(): void {
    if (localStorage.getItem('isLogged') === 'true') {
      localStorage.removeItem('username');
      localStorage.setItem('isLogged', 'false');
      localStorage.removeItem('users');
    }
  }
  /**
   * Function that works as interface to get information about logging status
   */
  isLogged() {
    return localStorage.getItem('isLogged') === 'true';
  }


  /**
   * Function that works as interface to get information about the
   * current user.
   */
  getCurrentUser(): any {
    return {
      status: this.isLogged(),
      user: this.dataProvider.getUserByUsername(localStorage.getItem('username'))
    };
  }
}
