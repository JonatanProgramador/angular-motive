import { Component, inject } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { MessageInterface } from '../../interfaces/MessageInterface';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../../components/dialogMessage/dialog-message/dialog-message.component';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-messages-page',
  imports: [MatTableModule, MatButtonModule, NgClass],
  templateUrl: './messages-page.component.html',
  styleUrl: './messages-page.component.css'
})
export class MessagesPageComponent {
  messages: MessageInterface[] = [];
  dialog = inject(MatDialog)
  selectMessage:MessageInterface = {id:-1, message:"", author:""};
  seeding:boolean = false;

  constructor(private MessageService: MessageService, private auth: UserService) {
    this.getMessages();
  }

  newMessage() {
    console.log("Creando nuevo mensaje");
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined) {
        this.seeding = true;
        const newMessage: MessageInterface = await this.MessageService.create(result.message);
        console.log(newMessage)
        if (newMessage) {
          let adios: MessageInterface[] = [...this.messages, newMessage];
          this.messages = adios;
        }
        this.seeding = false;
      }
    });
  }

  async getMessages() {
    let result = await this.MessageService.getAllByUser();
    if (result) {
      this.messages = result;
    } else {
      this.auth.setPermised(false);
    }
  }

  async deleteMessege() {
    this.seeding = true;
    const result = await this.MessageService.delete(this.selectMessage.id);
    if(result)  {
      this.messages = [...this.messages.filter((message)=> message.id !== this.selectMessage.id)];
    }
    this.seeding = false;
  }

  editMessage() {
    const dialogRef = this.dialog.open(DialogMessageComponent, {
      data: { id: this.selectMessage.id, message: this.selectMessage.message },
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined) {
        this.seeding = true;
        const resultUpdate = await this.MessageService.update(result.message, result.id)
        if (resultUpdate) {
          let adios: MessageInterface[] = [...this.messages];
          const index = adios.findIndex((message) => message.id === result.id);
          adios[index] = result;
          this.messages = adios;
        }
        this.seeding = false;
        this.selectMessage = {id:-1, message:"", author:""};
      }
    });
  }

  clickSelectMessage(event: MessageInterface) {
    this.selectMessage = event.id === this.selectMessage.id ? {id:-1, message:"", author:""} : event;
  }
}
