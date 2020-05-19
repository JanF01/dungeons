import { Component, OnInit, Input, ɵPlayer } from '@angular/core';
import { User } from '../models/user.model';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  @Input("user") player: User;
  weaponPos = {x:0,y:0};
  armorPos = {x:0,y:0};
  necklacePos = {x:0,y:0};
  ringPos = {x:0,y:0};

  constructor() { }

  ngOnInit(): void {
  }

  setDefault(){
    let items = document.getElementsByClassName('item') as HTMLCollectionOf<HTMLElement>;
    for(let i=0;i<items.length;i++){
      items[i].style.cursor="grab";
    }
  }

  weaponDrop($event: CdkDragEnd){
    this.weaponPos = {x:0,y:0};
    this.setDefault();
  }
  armorDrop($event: CdkDragEnd){
    this.armorPos = {x:0,y:0};
    this.setDefault();
  }
  necklaceDrop($event: CdkDragEnd){
    this.necklacePos = {x:0,y:0};
    this.setDefault();
  }
  ringDrop($event: CdkDragEnd){
    this.ringPos = {x:0,y:0};
    this.setDefault();
  }
  startDrag(){
    let items = document.getElementsByClassName('item') as HTMLCollectionOf<HTMLElement>;
    for(let i=0;i<items.length;i++){
      items[i].style.cursor="grabbing";
    }
  }

  backHome(){
    this.player.location="home";
  }


}
