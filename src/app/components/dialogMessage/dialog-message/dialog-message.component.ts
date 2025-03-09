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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-dialog-message',
  imports: [MatDialogTitle, FormsModule, MatButtonModule, MatDialogContent, MatFormFieldModule, MatInputModule, MatDialogActions, ReactiveFormsModule],
  templateUrl: './dialog-message.component.html',
  styleUrl: './dialog-message.component.css'
})
export class DialogMessageComponent {


  data = new FormGroup({
    id: new FormControl(inject(MAT_DIALOG_DATA).id, []),
    message: new FormControl(inject(MAT_DIALOG_DATA).message??'', [Validators.required])
  });

  readonly dialogRef = inject(MatDialogRef<DialogMessageComponent>);

  clickChange() {
    if(this.data.valid){
    this.dialogRef.close(this.data.value);
  }
  }

  clickCancel() {
    this.dialogRef.close();
  }

}


