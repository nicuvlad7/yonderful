import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterService } from 'src/app/services/register-service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.scss']
})
export class RegisterCardComponent implements OnInit {
  registerForm!: FormGroup;

  isInputValid: boolean = false;
  registrationStatus: boolean = false;
  registrationMessage: string = '';

  responseUserObject?: User;

  constructor(private registerService: RegisterService, private snackBar: MatSnackBar, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.initFormControls();
  }

  initFormControls(): void {
    this.registerForm = new FormGroup({
      registerNameControl: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+[a-zA-Z ]*')]),
      registerEmailControl: new FormControl('', [Validators.required, Validators.pattern('^[a-z]+\\.[a-z]+@tss-yonder\\.com')]),
      registerPasswordControl: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

  }

  isRegisterFormCompleted(): boolean {
    return this.registerForm.touched;
  }

  isRegisterFormValid(): boolean {
    return this.registerForm.valid;
  }

  isRegisterFormDone(): boolean {
    return this.isRegisterFormCompleted() && this.isRegisterFormValid();
  }

  onRegisterUser(): void {
    const user: User = {
      name: this.registerForm.get('registerNameControl')!.value.replace(/\s+/g, ' ').trim(), 
      email: this.registerForm.get('registerEmailControl')!.value.trim(), 
      password: this.registerForm.get('registerPasswordControl')!.value
    };

    this.registerService.register(user).subscribe({
      next: (data: User) => {
        this.responseUserObject = {...data};
        this.snackBar.open(`User ${this.responseUserObject.name} has been registered.`, '', {
          duration: 2500
        });
        this.router.navigate(['/login']);
      },
      error: (error: Error) => {
        this.snackBar.open(error.message, 'Close');
      }
    })
  }
}
