import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserDetails } from 'src/app/models/user';
import { AttendanceService } from 'src/app/services/attendance.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
	selector: 'app-participants-dialog',
	templateUrl: './participants-dialog.component.html',
	styleUrls: ['./participants-dialog.component.scss'],
})
export class ParticipantsDialogComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA)
		public data: {
			participants: UserDetails[];
			isEventOwner: boolean;
			eventId: number;
		},
		private dialogService: DialogService,
		private participantsService: AttendanceService
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

	deleteParticipant(userId: number) {
		this.openDeleteDialog().subscribe((result) => {
			if (result) {
				this.participantsService.deleteAttendance(this.data.eventId, userId).subscribe(
					(result) => {
						this.data.participants = this.data.participants.filter(
							(el) => el.id != userId
						);
					},
					(error) => {
            
					}
				);
			}
		});
	}
}
