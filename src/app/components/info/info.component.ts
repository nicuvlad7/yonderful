import { Component, Input, OnInit } from '@angular/core';
import { AlertType } from 'src/app/models/alert.type';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

    @Input() type: string = '';
    @Input() text: string = '';

    internalIcon: string;
    internalType: AlertType | string;

    private icons = {
        [AlertType.INFO]: 'info',
        [AlertType.WARNING]: 'warning',
        [AlertType.ERROR]: 'error'
    }

    constructor() { }

    ngOnInit(): void {
        this.internalType = this.type || AlertType.INFO;
        this.internalIcon = this.icons[this.internalType];
    }
}
