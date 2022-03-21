import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const importModules = [
  MatCardModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatToolbarModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatFormFieldModule
];

@NgModule({
  declarations: [],
  imports: importModules,
  exports: importModules,
})
export class MaterialModules {}
