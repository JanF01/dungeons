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
  strengthCost = 5;
  staminaCost = 5;
  hpCost = 5;
  speedCost = 5;
  luckCost = 5;

  constructor() { }


  showCost(i){
    let collection = document.getElementsByClassName("cost") as HTMLCollectionOf<HTMLElement>;
    collection[i].style.opacity='1';
  }
  hideCost(i){
    let collection = document.getElementsByClassName("cost") as HTMLCollectionOf<HTMLElement>;
    collection[i].style.opacity='0';
  }

  addStrength(){
    if(this.player.gold>=this.strengthCost){
    this.player.strength++;
    this.player.damage=this.player.strength*3;
    this.player.basePoints[0]++;
    
    this.player.gold-=this.strengthCost;
    this.strengthCost = Math.round((this.player.basePoints[0]+5)*((this.player.basePoints[0]+1)/2)*1.04);
    }
  }
  addSpeed(){
    if(this.player.gold>=this.speedCost){
    this.player.speed++;
    this.player.basePoints[2]++;


    this.player.gold-=this.speedCost;
    this.speedCost = Math.round((this.player.basePoints[2]+5)*((this.player.basePoints[2]+1)/2)*1.2);
    }
  }
  addHealth(){
    if(this.player.gold>=this.hpCost){
    this.player.hitPoints*=1.12;
    this.player.hitPoints = Math.round(this.player.hitPoints);
    this.player.basePoints[3]++;

    this.player.gold-=this.hpCost;
    this.hpCost = Math.round((this.player.basePoints[3]+5)*((this.player.basePoints[3]+1)/2)*1.04);
    }
  }
  addLuck(){
    if(this.player.gold>=this.luckCost){
    this.player.luck++;
    this.player.basePoints[4]++;

    this.player.gold-=this.luckCost;
    this.luckCost = Math.round((this.player.basePoints[4]+5)*((this.player.basePoints[4]+1)/2)*1.04);
    }
  }
  addStamina(){
    if(this.player.gold>=this.staminaCost){
    this.player.stamina++;
    this.player.basePoints[1]++;

    this.player.gold-=this.staminaCost;
    this.staminaCost = Math.round((this.player.basePoints[1]+5)*((this.player.basePoints[1]+1)/2)*1.15);
    }
  }

  ngOnInit(){
    this.costUpdate();
  }

  costUpdate(){
    this.strengthCost = Math.round((this.player.basePoints[0]+5)*((this.player.basePoints[0]+1)/2)*1.04);
 
    this.staminaCost = Math.round((this.player.basePoints[1]+5)*((this.player.basePoints[1]+1)/2)*1.04);

    this.speedCost = Math.round((this.player.basePoints[2]+5)*((this.player.basePoints[2]+1)/2)*1.10);

    this.hpCost = Math.round((this.player.basePoints[3]+5)*((this.player.basePoints[3]+1)/2)*1.04);

    this.luckCost = Math.round((this.player.basePoints[4]+5)*((this.player.basePoints[4]+1)/2)*1.15);
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
