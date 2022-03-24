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
        this.form = this.formBuilder.group({
            name: ['', Validators.required, Validators.pattern('^[a-zA-Z]+[a-zA-Z ]*')],
            position: ['', [Validators.required]],
            phoneNo: ['', [Validators.pattern('^[0-9]{0,10}')]],
        }, {});
        this.getUserDetails();
    }

    get controls() { return this.form.controls; }
    get isPhoneNoUnavailable() { return this.user.phoneNo == null || this.user.phoneNo == ''; }

    toggleIsView(): void {
        this.isView = !this.isView;
    }

    getUserDetails(): void {
        //to be replaced with the getLoggedUserDetails api call when implemented
        this.userDetailsService.getAllUsers().subscribe(response => {
            this.user = response[0];
        })
    }

    onSubmit(): void {
        //to be sent as PUT instead of locally (when getLoggedUserDetails implemented)
        if (!this.form.invalid) {
            this.user.name = this.form.value.name;
            this.user.position = this.form.value.position;
            this.user.phoneNo = this.form.value.phoneNo;
        }
    }

}

