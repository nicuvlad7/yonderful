import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loginUser } from 'src/app/models/loginUser';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent implements OnInit {
  loginForm!: FormGroup;
  isInputValid: boolean = false;
  loginStatus: boolean = false;
  loginMessage: string = '';

  responseUserObject?: loginUser;

  constructor(
    private loginService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initFormControls();
  }

  initFormControls(): void {
    this.loginForm = new FormGroup({
      loginEmailControl: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z]+\\.[a-zA-Z]+@tss-yonder\\.com'),
      ]),
      loginPasswordControl: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  isLoginFormCompleted(): boolean {
    return this.loginForm.touched;
  }

  isLoginFormValid(): boolean {
    return this.loginForm.valid;
  }

  isLoginFormDone(): boolean {
    return this.isLoginFormCompleted() && this.isLoginFormValid();
  }

  onLoginUser(): void {
    const user: loginUser = {
      email: this.loginForm.get('loginEmailControl')!.value,
      password: this.loginForm.get('loginPasswordControl')!.value,
    };

    this.loginService.login(user).subscribe({
      next: (data: loginUser) => {
        this.responseUserObject = { ...data };
        this.snackBar.open(
          `User ${this.responseUserObject.email} has been logged in.`
        );
      },
      error: (error: Error) => {
        this.snackBar.open(error.message, 'Close');
      },
    });
  }
}
