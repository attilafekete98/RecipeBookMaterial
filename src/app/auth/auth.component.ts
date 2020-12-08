import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private notificationService: NotificationService, private router: Router) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  private initForm(): void {
    const email = '';
    const password = '';

    this.loginForm = new FormGroup({
      email: new FormControl(email, [Validators.required, Validators.email]),
      password: new FormControl(password, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(): void {

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        this.notificationService.openError(errorMessage, 'Close', 2500);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.loginForm.reset();
  }

}
