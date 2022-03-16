import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadFileComponent implements OnInit {

  @Output() onUpload = new EventEmitter<{ file: File }>();
  @Input() editEnabled:Boolean=false;

  constructor() {}

  onFileSelected(event: any):void {  
    if(event.target.files && event.target.files[0]){
      const file = event.target.files[0];
      this.onUpload.emit({ file: file });
    }
  }

  ngOnInit(): void {}
}

