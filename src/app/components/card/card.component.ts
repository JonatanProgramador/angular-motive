import { Component, Input } from '@angular/core';
import { MessageInterface } from '../../interfaces/MessageInterface';
import { NgClass, NgStyle } from '@angular/common';
import {MatCardModule} from '@angular/material/card'

@Component({
  selector: 'app-card',
  imports: [NgClass, NgStyle, MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  constructor() {
   
  }
  @Input() message!:MessageInterface;
  openAnimationCard:boolean = this.message!==null

}
