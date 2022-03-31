import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { DialogService } from 'src/app/services/dialog.service';
import { ParticipantsAttendanceService } from 'src/app/services/participants-attendance.service';

@Component({
	selector: 'app-participants-dialog',
	templateUrl: './participants-dialog.component.html',
	styleUrls: ['./participants-dialog.component.scss'],
})
export class ParticipantsDialogComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA)
		public data: {
			participants: User[];
			isEventOwner: boolean;
		},
		private dialogService: DialogService,
		private participantsService: ParticipantsAttendanceService
	) {}
  
	ngOnInit(): void {}

	openDeleteDialog(): Observable<boolean> {
		return this.dialogService.confirmDialog({
			title: 'Confirm removal.',
			message: 'Are you sure you want to remove this participant??',
			confirmText: 'Yes',
			cancelText: 'No',
		});
	}

	deleteParticipant(id: number) {
		this.openDeleteDialog().subscribe((result) => {
			if (result) {
				this.participantsService.deleteParticipant(id!).subscribe(
					(result) => {
						this.data.participants = this.data.participants.filter(
							(el) => el.id != id
						);
					},
					(error) => {
            //to-do:
            //remove this after demo
						this.data.participants = this.data.participants.filter(
							(el) => el.id != id
						);
					}
				);
			}
		});
	}
}
