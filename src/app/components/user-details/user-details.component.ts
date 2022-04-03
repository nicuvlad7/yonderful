import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { DecodeToken } from 'src/app/helpers/decode.token';
import { UserDetails, UserUpdate } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
    loading: boolean = false;
    editMode: boolean = false;

    userEditForm!: FormGroup;

    userData = {} as UserDetails;

    userId: number;

    get controls() {
        return this.userEditForm.controls
    }

    constructor(private userService: UserService, private _snackBar: MatSnackBar, private decodeToken: DecodeToken, private dialogService: DialogService) {
        this.userId = this.decodeToken.getCurrentUserId();
    }

    ngOnInit(): void {
        this.initUserFormControls();
        this.retrieveUserData();
    }

    initUserFormControls(): void {
        this.userEditForm = new FormGroup({
            name: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.pattern('^[a-zA-Z]+[a-zA-Z ]*')]),
            position: new FormControl({ value: '', disabled: true }, [Validators.required]),
            phoneNo: new FormControl({ value: '', disabled: true }, [Validators.pattern('^[0-9]{0,10}')]),
            email: new FormControl({ value: '', disabled: true }, null)
        });
    }

    retrieveUserData(): void {
        this.loading = true;

        this.userService.getUserById(this.userId).subscribe(
            (result) => {

                this.userData.name = result.name;
                this.userData.position = result.position;

                this.controls.name.setValue(result.name);
                this.controls.position.setValue(result.position);
                this.controls.phoneNo.setValue(result.phoneNo);
                this.controls.email.setValue(result.email);

                this.loading = false;
            },
            (error) => {
                {
                    this._snackBar.open(
                        `Error status ${error.status}: ${error.message}`,
                        '',
                        {
                            duration: 5000,
                        }
                    );
                }
            }
        );
    }

    toggleEditMode(): void {
        if (!this.editMode) {
            this.editMode = !this.editMode;

            this.controls.name.enable();
            this.controls.position.enable();
            this.controls.phoneNo.enable();
        }
        else {
            if (this.userEditForm.dirty) {
                this.openConfirmDialog().subscribe((result) => {
                    if (result) {
                        this.editMode = !this.editMode;
                        this.retrieveUserData();
                        this.userEditForm.disable();
                    }
                });
            }
            else {
                this.editMode = !this.editMode;
                this.userEditForm.disable();
            }
        }
    }

    onSubmit(): void {
        let user: UserUpdate = {
            id: this.userId,
            name: this.controls.name.value,
            phoneNo: this.controls.phoneNo.value,
            position: this.controls.position.value,
        }
        this.loading = true;

        this.userService.putUser(user).subscribe(
            (result) => {
                this.userData.name = result.name;
                this.userData.position = result.position;

                this.controls.name.setValue(result.name);
                this.controls.position.setValue(result.position);
                this.controls.phoneNo.setValue(result.phoneNo);

                this.loading = false;

                this._snackBar.open('User successfully updated.', '', {
                    duration: 3000,
                });

                this.editMode = !this.editMode;
                if (this.userEditForm.dirty) {
                    this.retrieveUserData();
                }
                this.userEditForm.disable();

            },
            (error) => {
                {
                    this._snackBar.open(
                        `Error status ${error.status}: ${error.message}`,
                        '',
                        {
                            duration: 5000,
                        }
                    );
                }
            }
        );
    }


    openConfirmDialog(): Observable<boolean> {
        return this.dialogService.confirmDialog({
            title: 'Discard Changes',
            message: 'Are you sure you want to discard changes?',
            confirmText: 'Yes',
            cancelText: 'No',
        });
    }

    get phoneNoExists(): boolean {
        return !(this.controls.phoneNo.value == '') && !(this.controls.phoneNo.value == null);
    }

}