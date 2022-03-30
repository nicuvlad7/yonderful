import { Component, Input, OnInit } from '@angular/core';
import { AlertType } from 'src/app/models/alert.type';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

    @Input() set type(type: string) {
        this.internalType = type || AlertType.INFO;
        this.internalIcon = this.icons[this.internalType];
    }
    @Input() text: string = '';
    
    internalIcon: string | undefined;
    internalType: AlertType | string | undefined;
    private icons = {
        [AlertType.INFO]: 'info',
        [AlertType.WARNING]: 'warning',
        [AlertType.ERROR]: 'error'
    }

    constructor() { }

    ngOnInit(): void {
    }
}
