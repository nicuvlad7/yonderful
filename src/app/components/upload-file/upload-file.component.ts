import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],

})
export class UploadFileComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() controlName!: string;
  @Input() runMode?: string;
  @Input() message?:string;
  constructor() {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      if (this.runMode === undefined) {
        this.form.patchValue({ [this.controlName]: event.target.files[0] });
      }

      if (this.runMode === 'base64') {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (e) => {
          this.form.patchValue({ [this.controlName]: reader.result });
        };
      }
    }
  }
}
