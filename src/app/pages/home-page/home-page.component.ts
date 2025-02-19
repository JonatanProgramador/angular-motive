import { Component } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { MessageInterface } from '../../interfaces/MessageInterface';
import { CardComponent } from '../../components/card/card.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home-page',
  imports: [CardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  messages:MessageInterface[] = [];
  message:MessageInterface = {id:0,message:"",author:""}

  constructor(private service:MessageService, private auth:UserService){
    this.getMesseges();
  }
async getMesseges() {
  this.messages =  await this.service.getAll();
  let index:number = this.getRandomNumber(this.messages.length, 0);
    this.message = this.messages[index]
   setInterval(()=>{
    while(this.messages[index].id === this.message.id){
     index = this.getRandomNumber(this.messages.length, 0);
    }
     this.message = this.messages[index]
   }, 10000)
}

getRandomNumber(max:number, min:number) {
 return Math.floor(Math.random() * (max-1 - min + 1)) + min
}

}
