import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from 'src/app/services/user-details.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    user: any = {
        email: "nume.prenume@email.com",
        name: "Nume Prenume",
        role: 0,
        position: "Fullstack Dev",
        phoneNo: null
    };

    isView: boolean = true;

    constructor(private userDetailsService: UserDetailsService, private formBuilder: FormBuilder,) { }

    ngOnInit(): void {
        this.initFormControls();
        this.getUserDetails();
    }

    get f() { return this.form.controls; }

    initFormControls(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
        }, {
        });
    }

    toggleIsView(): void {
        this.isView = !this.isView;
        this.getUserDetails();
    }

    getUserDetails(): void {
        this.userDetailsService.getAllUsers().subscribe(response => {
            this.user = response[0];
        })
    }

    onSubmit(): void {

    }

}

