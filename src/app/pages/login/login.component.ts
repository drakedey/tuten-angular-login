import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/authentication/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorObj = {
    status: false,
    message: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(f: NgForm) {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    const { success, message } = this.authService.LoggingUser(username, password);
    if (!success) {
      this.errorObj = {
        status: !success,
        message
      };
    } else {
      this.errorObj = {
        status: !success,
        message
      };
      this.router.navigate(['/home']);
      return;
    }
    this.changeDetectorRef.detectChanges();
  }

}
