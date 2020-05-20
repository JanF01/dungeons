import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  bckMusicOne: any;
  fireball: any;
  swordThrow: any;
  enemyDmg: any;
  takeDmg: any;
  smallMoneyBag: any;
  dead: any;
  globalVolume: number = 1;


  constructor() { 
    this.bckMusicOne = new Audio();
    this.bckMusicOne.src = "assets/main_background.mp3";
    this.bckMusicOne.volume=0.007*this.globalVolume;
    this.bckMusicOne.loot = true;

    this.fireball = new Audio();
    this.fireball.volume=0.05*this.globalVolume;
    this.fireball.src="assets/fireball.mp3";

    this.swordThrow = new Audio();
    this.swordThrow.volume=0.05*this.globalVolume;;
    this.swordThrow.src="assets/sword.mp3";

    this.enemyDmg = new Audio();
    this.enemyDmg.volume=0.05*this.globalVolume;;
    this.enemyDmg.src="assets/enemyDamage.mp3";

    this.takeDmg = new Audio();
    this.takeDmg.volume=0.05*this.globalVolume;;
    this.takeDmg.src="assets/takeDamage.mp3";


    this.dead = new Audio();
    this.dead.src="assets/enemyDead.mp3";
    this.dead.volume=0.01*this.globalVolume;;

    
    this.smallMoneyBag = new Audio();
    this.smallMoneyBag.src="assets/smallMoneyBag.mp3";
    this.smallMoneyBag.volume=0.09*this.globalVolume;

  }

  playBackgroundOne(){
    this.bckMusicOne.play();
  }

  throwFireball(){
    this.fireball.play();
  }
  throwSword(){
    this.swordThrow.play();
  }
  takeDamage(){
    this.takeDmg.play();
  }
  enemyDamage(){
    this.enemyDmg.play();
  }
  deadIs(){
    this.dead.play();
  }

  openSmallMoneyBag(){
    this.smallMoneyBag.play();
  }


}
