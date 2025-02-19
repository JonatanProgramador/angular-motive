import { Component } from '@angular/core';
import {RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor( public auth:UserService, private messageService:MessageService) {
    (async ()=>auth.setPermised(await messageService.getAllByUser()))();
  }
  
}

