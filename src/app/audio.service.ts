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
  dead: any;

  constructor() { 
    this.bckMusicOne = new Audio();
    this.bckMusicOne.src = "assets/background.mp3";
    this.bckMusicOne.volume=0.07;
    this.bckMusicOne.loot = true;

    this.fireball = new Audio();
    this.fireball.src="assets/fireball.mp3";

    this.swordThrow = new Audio();
    this.swordThrow.src="assets/sword.mp3";

    this.enemyDmg = new Audio();
    this.enemyDmg.src="assets/enemyDamage.mp3";

    this.takeDmg = new Audio();
    this.takeDmg.src="assets/takeDamage.mp3";


    this.dead = new Audio();
    this.dead.src="assets/enemyDead.mp3";
    this.dead.load();

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


}
