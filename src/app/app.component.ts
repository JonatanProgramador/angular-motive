import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { MessageService } from './services/message.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatButtonModule, MatIconModule, NgStyle],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  activeUrl:string = "/";

  constructor( public auth:UserService, 
    private messageService:MessageService, 
    private route:Router) {
    auth.isAuth();
  }

  isActive(route: string): boolean {
    return this.route.isActive(route, true);
  }



  
  clickLogout() {
    this.auth.logout();
    this.route.navigate(['/']);
  }
  
}

