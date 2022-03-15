import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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

  constructor() { 
    
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
    console.log("Hello");
  }

}
