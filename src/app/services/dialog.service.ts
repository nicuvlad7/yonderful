import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from '../components/dialogs/confirm/confirm.component';
import { ParticipantsDialogComponent } from '../components/participants-dialog/participants-dialog.component';
import { ConfirmDialogData } from '../models/confirm-dialog-data';
import { UserDetails } from '../models/user';

@Injectable({
	providedIn: 'root',
})
export class DialogService {
	constructor(private dialog: MatDialog) {}

	confirmDialog(data: ConfirmDialogData): Observable<boolean> {
		return this.dialog
			.open(ConfirmComponent, {
				data,
				width: '400px',
				disableClose: true,
			})
			.afterClosed();
	}

	participantsDialog(data: {
		participants: UserDetails[];
		isEventOwner: boolean;
		eventId: number;
	}): Observable<boolean> {
		return this.dialog
			.open(ParticipantsDialogComponent, {
				data,
                autoFocus: false,
				width: '400px',
				disableClose: true,
			})
			.afterClosed();
	}
  
}
