import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  @Input() users: User[];
  @Input() currentUser: User;
  user: User;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.user = null;
  }

  onUserSelected(user: User) {
    this.user = user;
    this.changeDetectorRef.detectChanges();
  }

}
