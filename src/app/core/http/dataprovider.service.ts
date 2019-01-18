import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../../shared/user.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Service in charge of parsing, procces and transform
 * the data used at all the aplication.
 */
export class DataproviderService {
  users: User[];
  constructor(private http: Http) {
    if (!localStorage.getItem('users')) {
      this.fetchUsers();
    } else {
      this.users = this.getUsers();
    }
   }


  /**
   * Function in charge of fetch, parse and store data from JSON file
   */
  protected fetchUsers(): void {
    const users = [];
    this.http.get('http://localhost:4200/assets/data.json')
    .subscribe( (data: any) => {
      const usersResponse = JSON.parse(data._body);
      usersResponse.data.forEach(user => {
        const { username, name, password, role, country, description} = user;
        users.push(new User(name, username, password, description, role, country));
      });
     localStorage.setItem('users', JSON.stringify(users));
     this.users = users;
    });
  }

  /**
   * Interface to get user object stored at localStorage
   */
  getUsers(): any {
    return JSON.parse(localStorage.getItem('users'));
  }

  /**
   * function in charge of get all the users except
   * the current user
   * @param username primari key to filter user
   */
  filterUsers(username: string): User[] {
    const users = this.users.filter(u => u.username !== username);
    return users;
  }


  /**
   * Function to update the description of a given user
   * @param user user target
   * @param description description updated
   */
  updateDescription(user: User, description: string): Boolean {
    let outerIndex = null;
    this.users.some((userEl, index) => {
      if (userEl.username === user.username) {
        outerIndex = index;
        return true;
      }
    });

    if (outerIndex !== null) {
      this.users[outerIndex].description = description;
      localStorage.setItem('users', JSON.stringify(this.users));
      return true;
    } else { return false; }
  }

  /**
   * Function that returns a user from a given username
   * @param username primary key to fetch user
   */
  getUserByUsername(username: string): any {
    const user = this.users.find( u => u.username === username);
    if (user === undefined) {
      return {
        succes: false,
        message: 'Theres no user with the given username',
        user: null
      };
    } else {
      return {
        succes: true,
        message: 'User Found',
        user
      };
    }
  }

}
