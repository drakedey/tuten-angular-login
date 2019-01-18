import { Component, OnInit, Input, AfterViewChecked, ChangeDetectorRef, AfterContentChecked, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';

import { DataproviderService } from 'src/app/core/http/dataprovider.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent implements OnInit {

  public _user: User;
  onEdit: Boolean;
  editStatus: Boolean;

  @Input() canEdit: Boolean;
  @Input()
  set user(user: User) {
    this._user = user;
    const description = user ? user.lastName ? user.lastName : 'missing description' : '';
    this.descriptionForm.get('description').patchValue(description);
    if (this.canEdit === false) { this.descriptionForm.get('description').disable(); }
    this.changeDetectorRef.detectChanges();
  }
  descriptionForm: FormGroup = this.formBuilder.group({
    description: ['', Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private dataProviderService: DataproviderService,
    private changeDetectorRef: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.onEdit = false;
  }

  // onDescriptionSubmit(f: NgForm) {
  //   const description = this.descriptionForm.get('description').value;
  //   const result = this.dataProviderService.updateDescription(this._user, description);
  //   this.onEdit = true;
  //   this.editStatus = result;
  //   this.changeDetectorRef.detectChanges();
  //   return;
  // }

}
