import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-dialog-message',
  imports: [MatDialogTitle, MatDialogContent, MatFormFieldModule, MatInputModule],
  templateUrl: './dialog-message.component.html',
  styleUrl: './dialog-message.component.css'
})
export class DialogMessageComponent {

  readonly data = inject(MAT_DIALOG_DATA);

}
