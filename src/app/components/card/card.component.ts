import { Component, Input } from '@angular/core';
import { MessageInterface } from '../../interfaces/MessageInterface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  constructor() {
   
  }
  @Input() message!:MessageInterface;
  openAnimationCard:boolean = this.message!==null

}
