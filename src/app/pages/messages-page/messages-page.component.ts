import { Component } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { MessageInterface } from '../../interfaces/MessageInterface';
import {MatTableModule} from '@angular/material/table';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-messages-page',
  imports: [MatTableModule],
  templateUrl: './messages-page.component.html',
  styleUrl: './messages-page.component.css'
})
export class MessagesPageComponent {
  messages:MessageInterface[]=[];

  constructor(private MessageService:MessageService, private auth:UserService){
    this.getMessages();
  }

  async getMessages() {
    let result = await this.MessageService.getAllByUser();
    if(result) {
    this.messages = result;
  } else {
    this.auth.setPermised(false);
  }
  }


}
