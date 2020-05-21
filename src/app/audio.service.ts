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
  playerDead: any;
  globalVolume: number = 1;
  dungeonsBck: any;


  constructor() { 
    this.bckMusicOne = new Audio();
    this.bckMusicOne.src = "assets/main_background.mp3";
    this.bckMusicOne.volume=0.007*this.globalVolume;
    this.bckMusicOne.load();
    this.bckMusicOne.loop = true;

    this.dungeonsBck = new Audio();
    this.dungeonsBck.src = "assets/dungeonsMusic.wav";
    this.dungeonsBck.volume = 0.09;
    this.dungeonsBck.load();
    this.dungeonsBck.loop = true;

    this.fireball = new Audio();
    this.fireball.volume=0.03*this.globalVolume;
    this.fireball.src="assets/fireball.mp3";

    this.swordThrow = new Audio();
    this.swordThrow.volume=0.03*this.globalVolume;;
    this.swordThrow.src="assets/sword.mp3";

    this.enemyDmg = new Audio();
    this.enemyDmg.volume=0.015*this.globalVolume;;
    this.enemyDmg.src="assets/enemyDamage.mp3";

    this.takeDmg = new Audio();
    this.takeDmg.volume=0.015*this.globalVolume;;
    this.takeDmg.src="assets/takeDamage.mp3";


    this.dead = new Audio();
    this.dead.src="assets/win2.wav";
    this.dead.volume=0.05*this.globalVolume;;

    this.playerDead= new Audio();
    this.playerDead.src="assets/playerDead.wav";
    this.playerDead.volume=0.2*this.globalVolume;;

    
    this.smallMoneyBag = new Audio();
    this.smallMoneyBag.src="assets/smallMoneyBag.mp3";
    this.smallMoneyBag.volume=0.003*this.globalVolume;
    this.smallMoneyBag.load();

  }

  playBackgroundOne(){
    this.bckMusicOne.play();
  }
  stopMusicBck(){
    this.bckMusicOne.pause();
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
  enemyDead(){
    this.dead.play();
  }

  playerIsDead(){
    this.playerDead.play();
  }

  openSmallMoneyBag(){
    const newAudio = this.smallMoneyBag.cloneNode();
    newAudio.play()
  }

  playDungeonsMusic(){
    this.dungeonsBck.play();
  }


}
