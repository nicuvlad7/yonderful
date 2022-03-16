import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterService } from 'src/app/services/register-service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.scss']
})
export class RegisterCardComponent implements OnInit {
  registerNameControl!: FormControl;
  registerEmailControl!: FormControl;
  registerPasswordControl!: FormControl;

  isInputValid: boolean = false;
  registrationStatus: boolean = false;
  registrationMessage: string = '';

  responseUserObject?: User;

  constructor(private registerService: RegisterService, private snackBar: MatSnackBar) { 
    
  }

  ngOnInit(): void {
    this.initFormControls();
  }

  initFormControls(): void {
    this.registerNameControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+')]);
    this.registerEmailControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+\\.[a-zA-Z]+@tss-yonder\\.com')]);
    this.registerPasswordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  }

  isRegisterFormCompleted(): boolean {
    return !(this.registerNameControl.value === '' || this.registerEmailControl.value === '' || this.registerPasswordControl.value === '')
  }

  isRegisterFormValid(): boolean {
    return this.registerNameControl.valid && this.registerEmailControl.valid && this.registerPasswordControl.valid;
  }

  isRegisterFormDone(): boolean {
    return this.isRegisterFormCompleted() && this.isRegisterFormValid();
  }

  onClick(): void {
    const user: User = {name: this.registerNameControl.value, email: this.registerEmailControl.value, password: this.registerPasswordControl.value};

    this.registerService.register(user).subscribe({
      next: (data: User) => {
        this.responseUserObject = {...data};
        this.snackBar.open(`User ${this.responseUserObject.name} has been registered.`);
      },
      error: (error: Error) => {
        this.snackBar.open(error.message);
      }
    })
  }
}
