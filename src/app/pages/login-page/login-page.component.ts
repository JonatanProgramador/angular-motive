import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-page',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule],
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

  constructor(private service:UserService) {}
  
  async send(event:Event) {
    event.preventDefault();
    if(this.data.valid) {
      this.sending = true;
      let result = await this.service.login(this.data.value.name??"", this.data.value.password??"");
      this.sending = false;
    } else {
      this.message="datos invalidos"
    }
  }
}
