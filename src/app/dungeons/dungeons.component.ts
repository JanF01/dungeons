import { Component, OnInit } from '@angular/core';
import { User } from "./models/user.model";
import { Enemy } from "./models/enemy.model";
import { trigger, transition, style, animate, state } from '@angular/animations';
import { fromEventPattern } from 'rxjs';

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
        animate(400)
      ]),
      transition('playerTurn => back', [
        animate(400)
      ]),
    ]),
    trigger('swordMomentum',[
      state('back',style({opacity:0, left:"30%", transform:"rotate(0deg)"})),
      state('throw',style({opacity:1, left:"75%", transform:"rotate(45deg)"})),
      transition('back => throw', [
        animate(300)
      ]),
      transition('throw => back', [
        animate(300)
      ])
    ]),
    trigger('takeDamage',[
      state('false',style({left:'20%', filter:"brightness(100%)"})),
      state('true',style({left: '15%', filter:"brightness(260%)"})),
    transition('false=>true',[
        animate(150)
    ]),
    transition('true=>false',[
      animate(150)
  ]),
    ]),
    trigger('enemyAnimation',[
      state('back',style({left:"70%", filter:"brightness(100%)"})),
      state('takeDamage',style({left:"70%", top: "35%", filter:"brightness(240%) saturate(700%)"})),
      state('throwFireball',style({left:"74%", filter:"brightness(100%)"})),
      transition('back => takeDamage', [
        animate(200)
      ]),
      transition('takeDamage => back', [
        animate(200)
      ]),
      transition('back => throwFireball', [
        animate(200)
      ]),
      transition('throwFireball => back', [
        animate(200)
      ])
    ]),
    trigger('showDamage',[
      state('false',style({fontSize:"2.0em", opacity:1, top:'47%'})),
      state('true',style({fontSize:"3.9em", opacity:0, top: "-6%"})),
      transition('false => true', [
        animate(1500)
      ]),
      transition('true => false', [
        animate(1)
      ])
    ]),
    trigger('enemyAttack',[
      state('back',style({opacity:0, left:"80%"})),
      state('throwFireball',style({opacity:1, left:"21%"})),
      transition('back => throwFireball', [
        animate(660)
      ])
    ]),
  ]
})
export class DungeonsComponent implements OnInit {
 
  name: string = "fff";
  inGame: boolean = true;
  coins: number = 0;

  player: User = new User();
  playerAnimation: string = "back";
  swordAnimation: string = "back";
  enemyState: string = "back";
  showDamage: boolean = false;
  enemyDamage: Array<any> = [];
  playerDamage: Array<any> = [];
  enemyHit: boolean = false;
  enemy: Enemy = {
      hitPoints: 4561,
      health: 4561,
      name: "Fire",
      damage: 112
    };



  constructor() { 
  
  }

  ngOnInit(){
    this.start();
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
      this.inGame = true;
      this.player = {
        name: this.name,
        level: 1,
        experience: 0,
        gold: 0,
        strength: 5,
        damage: 454,
        hitPoints: 5189,
        health: 5189,
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
      let t = 11;
      for(let i=0;i<10;i++){
      t = this.playerTurn(t);
      let r = Math.random()*100;
     if(r<=70){
      setTimeout(()=>{
      this.enemyTurn();
      },t);
      t+=960;
    }
    }
    }

  }

  playerTurn(t){
    setTimeout(()=>{
    this.playerAnimation = "playerTurn";
    },t);
    t+=400
    setTimeout(()=>{
    this.playerAnimation = "back";
    this.swordAnimation = "throw";
    },t)
    t+=300
    setTimeout(()=>{
      this.swordAnimation = "back";
      this.enemyState = "takeDamage";
      this.enemy.health-=this.player.damage;
    },t);
    t+=200;
    setTimeout(()=>{
      this.enemyState = "back";
      this.enemyDamage.push([this.player.damage,false]);
      setTimeout(()=>{
      this.enemyDamage[this.enemyDamage.length-1][1] = true;
      },10);
    },t);
    //t+=200;
    setTimeout(()=>{
      this.enemyDamage.shift();
    },t+1500);

    return t+200;

  }


  enemyTurn(){
    this.enemyState = "throwFireball";
    setTimeout(()=>{
    this.enemyState = "back";
    this.enemyHit=true;
    this.player.health-=this.enemy.damage;
    },660);
    setTimeout(()=>{
    this.enemyHit=false;
    this.playerDamage.push([this.enemy.damage,false]);
    setTimeout(()=>{
      this.playerDamage[this.playerDamage.length-1][1] = true;
      },10);
    },810);
    setTimeout(()=>{
      this.playerDamage.shift();
    },2300);
  }






}
