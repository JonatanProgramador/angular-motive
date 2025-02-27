import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  data = new FormGroup({
    name: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });
  
  message:string|null|undefined = "";
  sending:boolean = false;
  hiddenPassword:boolean = true;

  constructor(private service:UserService) {}
  
  send(event:Event) {
    event.preventDefault();
    if(this.data.valid) {
      this.sending = true;
      let result = this.service.login(this.data.value.name??"", this.data.value.password??"");
      result.subscribe((data) => {
        this.message = 'message' in data?data.message as string:this.message;
        this.service.isAuth();
        this.sending = false;
      }, (error:HttpErrorResponse)=> {
        this.message="Error al identificar al usuario"
        this.sending = false;
      })
    }
  }

  setShowPassword() {
    this.hiddenPassword = !this.hiddenPassword;
  }
}
