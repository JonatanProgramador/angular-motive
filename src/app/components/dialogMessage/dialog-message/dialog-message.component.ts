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
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';

//TODO. implementar el control de formularios como login.

@Component({
  selector: 'app-dialog-message',
  imports: [MatDialogTitle,FormsModule, MatButtonModule, MatDialogContent, MatFormFieldModule, MatInputModule, MatDialogActions],
  templateUrl: './dialog-message.component.html',
  styleUrl: './dialog-message.component.css'
})
export class DialogMessageComponent {

  readonly data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<DialogMessageComponent>);

  clickChange() {
    this.dialogRef.close(this.data);
  }

  clickCancel() {
    this.dialogRef.close();
  }

}


