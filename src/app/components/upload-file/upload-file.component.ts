import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadFileComponent implements OnInit {

  @Input() editEnabled:Boolean=false;
  @Input() form!: FormGroup;
  @Input() controlName!:string;
  
  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {  
     
    if(event.target.files && event.target.files[0]){
      this.form.patchValue({[this.controlName] : event.target.files[0]});
    } 
  }
}

