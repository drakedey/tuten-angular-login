import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

import { AuthService } from '../../core/authentication/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  errorObj = {
    status: false,
    error: ''
  };
  logginSubscriptions = new Subscription();
  isLoging: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.onLoginSubscription();
  }


  ngOnDestroy() {
    this.logginSubscriptions.unsubscribe();
  }

  onLoginSubscription(): void {
    const logginSub = this.authService.onLoggin().subscribe((loginObj: any) => {
      const { status } = loginObj;
      if (!status) {
        console.log('error');
        const { error } = loginObj;
        this.errorObj = { status: true, error };
      } else {
        console.log('navigating');
        location.href='/home';
      }
      this.isLoging = false;
      this.changeDetectorRef.detectChanges();
    });
    this.logginSubscriptions.add(logginSub);
  }

  onLogin(f: NgForm): void {
    this.isLoging = true;
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    this.authService.logginUser(username, password);
  }
}
