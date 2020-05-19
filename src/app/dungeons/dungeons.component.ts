import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from "./models/user.model";
import { CaveComponent } from './cave/cave.component';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-dungeons',
  templateUrl: './dungeons.component.html',
  styleUrls: ['./dungeons.component.scss']
})
export class DungeonsComponent implements OnInit {
 
  name: string = "Janke";
  inGame: boolean = true;
  @ViewChild(CaveComponent) cave: CaveComponent;

  player: User = new User();
    
  ngOnInit(){
    this.start();
  }

  constructor(private audio: AudioService){

  }

  


  check(){
    if(this.name.length<2){
     // document.getElementById("n").style.animation="none";
     // document.getElementById("n").style.borderBottomColor="#ff073a";
      return false;
     }
     else{
     // document.getElementById("n").style.borderBottomColor="black";
     // document.getElementById("n").style.animation="blink 3s infinite";
       return true;
     }
  }


  start(){
    if(this.check()){
      this.audio.playBackgroundOne();
      this.inGame = true;
      this.player = {
        name: this.name,
        level: 1,
        exp: 590,
        gold: 0,
        strength: 5,
        damage: 1251,
        hitPoints: 5189,
        health: 5189,
        stamina: 20,
        staminaLeft: 20,
        speed:23,
        luck: 0,
        location: "home",
        dungeon: 1,
        subdungeon: 1,
        goldInSack: 0,
        graphic: "assets/knight1.png",
        weapon: "assets/sword1.png",
        armor: "assets/armor2.png",
        necklace: "assets/necklace.png",
        ring: "assets/ring2.png",
      }
    }
  }

  backHome(){
    this.player.location='home'; 
    this.player.gold+=this.player.goldInSack; 
    this.player.goldInSack=0
   }


  // DUNGEONS

  goCave(lvl){
     this.player.location="dfight";
     setTimeout(()=>{
     this.cave.fight(lvl);
     },10);
  }


}
