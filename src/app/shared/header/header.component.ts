import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/authentication/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLogged: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.userLogged = Boolean(this.authService.getCurrentUserValue());
    console.log(this.userLogged);
    this.changeDetectorRef.detectChanges();
  }

  onLogout(event: any): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
