import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  data = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    passwordRepeat: new FormControl('', [Validators.required])
  });

  message: string | null | undefined = "";
  sending: boolean = false;
  hiddenPassword: boolean = true;

  constructor(private service: UserService, private snackBar: MatSnackBar, private router:Router) { }

  send(event: Event) {
    event.preventDefault();
    if (this.data.valid && this.data.value.password === this.data.value.passwordRepeat) {
      this.sending = true;
      let result = this.service.register(this.data.value.name ?? "", this.data.value.password ?? "");
      result.subscribe({
        next: (data) => {
          this.snackBar.open("Registro realizado correctamente", '', { duration: 1000 });
          this.sending = false;
          setTimeout(()=>{this.router.navigate(['/login'])},1000);
        }, error: (error: HttpErrorResponse) => {

          this.snackBar.open("Error al registrar", '', { duration: 1000 });
          this.sending = false;
        }
      });
    } else if (!this.data.valid) {
      this.snackBar.open("Datos invalidos", '', { duration: 1000 });
    } else {
      this.snackBar.open("La contraseña no coiciden", '', { duration: 1000 });
    }
  }

  setShowPassword() {
    this.hiddenPassword = !this.hiddenPassword;
  }
}
