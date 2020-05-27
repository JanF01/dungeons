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
  block: any;
  smallMoneyBag: any;
  dead: any;
  playerDead: any;
  globalVolume: number = 1;
  dungeonsBck: any;


  constructor() { 
    this.bckMusicOne = new Audio();
    this.bckMusicOne.src = "assets/main_background.mp3";
    this.bckMusicOne.volume=0.008*this.globalVolume;
    this.bckMusicOne.load();
    this.bckMusicOne.loop = true;

    this.dungeonsBck = new Audio();
    this.dungeonsBck.src = "assets/dungeonsMusic.wav";
    this.dungeonsBck.volume = 0.11;
    this.dungeonsBck.load();
    this.dungeonsBck.loop = true;

    this.fireball = new Audio();
    this.fireball.volume=0.03*this.globalVolume;
    this.fireball.src="assets/fireball.mp3";

    this.swordThrow = new Audio();
    this.swordThrow.volume=0.03*this.globalVolume;
    this.swordThrow.src="assets/sword.mp3";

    this.enemyDmg = new Audio();
    this.enemyDmg.volume=0.015*this.globalVolume;
    this.enemyDmg.src="assets/enemyDamage.mp3";

    this.takeDmg = new Audio();
    this.takeDmg.volume=0.015*this.globalVolume;
    this.takeDmg.src="assets/takeDamage.mp3";

    this.block = new Audio();
    this.block.volume = 0.016*this.globalVolume;
    this.block.src="assets/block2.mp3";


    this.dead = new Audio();
    this.dead.volume=0.03*this.globalVolume;
    this.dead.src="assets/win2.wav";


    this.playerDead= new Audio();
    this.playerDead.volume=0.2*this.globalVolume;
    this.playerDead.src="assets/playerDead.wav";

    
    this.smallMoneyBag = new Audio();
    this.smallMoneyBag.src="assets/smallMoneyBag.mp3";
    this.smallMoneyBag.load();

  }

  playBackgroundOne(){
    setTimeout(()=>{
    this.bckMusicOne.play();
    },600);
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

  playBlock(){
    this.block.play();
  }
  enemyDead(){
    this.dead.play();
  }

  playerIsDead(){
    this.playerDead.play();
  }

  openSmallMoneyBag(){
    const newAudio = this.smallMoneyBag.cloneNode();
    newAudio.volume = 0.05;
    newAudio.play()
  }

  playDungeonsMusic(){
    setTimeout(()=>{
    this.dungeonsBck.play();
    },600);
  }
  stopDungeonMusic(){
    this.dungeonsBck.pause();
  }


  changeVolumes(){
    this.bckMusicOne.volume=0.008*this.globalVolume;

    this.dungeonsBck.volume = 0.11*this.globalVolume;


    this.fireball.volume=0.03*this.globalVolume;


    this.swordThrow.volume=0.03*this.globalVolume;


    this.enemyDmg.volume=0.015*this.globalVolume;

    this.takeDmg.volume=0.015*this.globalVolume;

    this.block.volume = 0.016*this.globalVolume;



    this.dead.volume=0.03*this.globalVolume;


    this.playerDead.volume=0.2*this.globalVolume;

  }



}
