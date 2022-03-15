import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.scss']
})
export class RegisterCardComponent implements OnInit {
  registerNameControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]+')]);
  registerEmailControl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+\\.[a-zA-Z]+@tss-yonder\\.com')]);
  registerPasswordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  username: string = '';
  email: string = '';
  password: string = '';

  constructor() { 
    
  }


  ngOnInit(): void {
    this.registerNameControl.valueChanges.subscribe(value => {
      this.username = value;
      
    })

    this.registerEmailControl.valueChanges.subscribe(value => {
      this.email = value;
    })

    this.registerPasswordControl.valueChanges.subscribe(value => {
      this.password = value;
    })
  }

  isRegisterFormComplete(): boolean {
    return (this.registerNameControl.value === '' || this.registerEmailControl.value === '' || this.registerPasswordControl.value === '') ? false : true;
  }

}
