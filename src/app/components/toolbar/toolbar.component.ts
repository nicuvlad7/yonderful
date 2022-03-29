import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { loginUser } from 'src/app/models/loginUser';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    currentUser: loginUser;

    constructor(
        private router: Router,
        private snackBar: MatSnackBar,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(
            (x) => (this.currentUser = x)
        );
    }

    ngOnInit(): void { }

    onLogoutUser(): void {
        this.authenticationService.logout();
        this.snackBar.open(
            `Successfully logged out.`,
            '',
            {
                duration: 1000
            }
        );
        this.router.navigate(['/login']);
    }
}
