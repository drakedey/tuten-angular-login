import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Output() userSelected = new EventEmitter<User>();
  @Input() users: User[];
  constructor() { }

  ngOnInit() {
  }

  onUserClicked(user: User, event: any) {
    event.preventDefault();
    this.userSelected.emit(user);
  }

}
