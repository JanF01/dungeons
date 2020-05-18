import { Component } from '@angular/core';
import { User } from "./models/user.model";
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-dungeons',
  templateUrl: './dungeons.component.html',
  styleUrls: ['./dungeons.component.scss'],
  animations: [
    trigger('showUp',[
      transition('void => *',[
        animate(10,style({opacity:1}))
      ]),
    ]),
    trigger('momentum',[
      state('back',style({left:"20%"})),
      state('playerTurn',style({left:"40%"})),
      transition('back => playerTurn', [
        animate(500)
      ]),
      transition('playerTurn => back', [
        animate(500)
      ]),
    ]),
    trigger('swordMomentum',[
      state('back',style({opacity:0, left:"30%"})),
      state('throw',style({opacity:1, left:"70%"})),
      transition('back => throw', [
        animate(400)
      ]),
      transition('throw => back', [
        animate(400)
      ])
    ])
  ]
})
export class DungeonsComponent {
 
  name: string = "";
  inGame: boolean = false;
  coins: number = 0;

  player: User = new User();
  playerAnimation: string = "back";
  swordAnimation: string = "back";



  constructor() { }


  check(){
    if(this.name.length<2){
      document.getElementById("n").style.animation="none";
      document.getElementById("n").style.borderBottomColor="#ff073a";
      return false;
     }
     else{
      document.getElementById("n").style.borderBottomColor="black";
      document.getElementById("n").style.animation="blink 3s infinite";
       return true;
     }
  }


  start(){
    if(this.check()){
      this.inGame = true;
      this.player = {
        name: this.name,
        level: 1,
        experience: 0,
        gold: 0,
        strength: 5,
        hitPoints: 10,
        stamina: 20,
        staminaLeft: 20,
        luck: 0,
        location: "home",
        dungeon: 1,
        subdungeon: 1,
      }
    }
  }



  // DUNGEONS



  goToDungeons(){
     this.player.location = "dungeons";
  }

  fight(lvl){

    if(lvl<=this.player.subdungeon){
      this.player.location = "dfight";
      setTimeout(()=>{
      this.playerAnimation = "playerTurn";
      },11);
      setTimeout(()=>{
      this.playerAnimation = "back";
      this.swordAnimation = "throw";
      },512)
      setTimeout(()=>{
        this.swordAnimation = "back";
      },952);
    }

  }






}
