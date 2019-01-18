import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/authentication/auth-service.service';
import { DataproviderService } from 'src/app/core/http/dataprovider.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  users: User[];
  descriptionForm: FormGroup;
  onEdit: boolean;
  editStatus: Boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder:  FormBuilder,
    private dataProviderService: DataproviderService,
    private changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
    // this.getUser();
    // this.filterUsers();
    this.initializeAndFillDescriptionForm();
  }

  // getUser(): void {
  //   const { status, user } = this.authService.getCurrentUser();
  //   if (!status) { // Just In case....
  //     this.router.navigate(['/']);
  //   } else {
  //     this.user = user.user;
  //   }
  // }

  initializeAndFillDescriptionForm() {
    this.descriptionForm = this.formBuilder.group({
      description: ['', Validators.required]
    });
    this.descriptionForm.get('description').patchValue(this.user.description);
  }

  // onDescriptionSubmit(f: NgForm) {
  //   const description = this.descriptionForm.get('description').value;
  //   const result = this.dataProviderService.updateDescription(this.user, description);
  //   this.onEdit = true;
  //   this.editStatus = result;
  //   this.changeDetectorRef.detectChanges();
  //   return;
  // }

  // filterUsers() {
  //   this.users = this.dataProviderService.filterUsers(this.user.username);
  // }

}
