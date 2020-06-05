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
  lvlUp: any;
  globalVolume: number = 1;
  dungeonsBck: any;
  villageBck: any;


  constructor() { 
    this.bckMusicOne = new Audio();
    this.bckMusicOne.src = "assets/soundtrack/main.mp3";
    this.bckMusicOne.volume=0.01*this.globalVolume;
    this.bckMusicOne.load();
    this.bckMusicOne.loop = true;

    this.dungeonsBck = new Audio();
    this.dungeonsBck.src = "assets/soundtrack/dungeons.wav";
    this.dungeonsBck.volume = 0.09*this.globalVolume;
    this.dungeonsBck.load();
    this.dungeonsBck.loop = true;

    this.villageBck = new Audio();
    this.villageBck.src = "assets/soundtrack/village.wav";
    this.villageBck.volume = 0.02*this.globalVolume;
    this.villageBck.load();
    this.villageBck.loop = true;

    this.fireball = new Audio();
    this.fireball.src="assets/sound/fireball.mp3";

    this.swordThrow = new Audio();
    this.swordThrow.volume=0.03*this.globalVolume;
    this.swordThrow.src="assets/sound/sword.mp3";

    this.enemyDmg = new Audio();
    this.enemyDmg.volume=0.015*this.globalVolume;
    this.enemyDmg.src="assets/sound/enemyDamage.mp3";

    this.takeDmg = new Audio();
    this.takeDmg.src="assets/sound/takeDamage.mp3";

    this.lvlUp = new Audio();
    this.lvlUp.volume=0.19*this.globalVolume;
    this.lvlUp.src="assets/sound/levelUp.wav";

    this.block = new Audio();
    this.block.src="assets/sound/block.mp3";


    this.dead = new Audio();
    this.dead.volume=0.06*this.globalVolume;
    this.dead.src="assets/sound/win.wav";


    this.playerDead= new Audio();
    this.playerDead.volume=0.2*this.globalVolume;
    this.playerDead.src="assets/sound/playerDead.wav";

    
    this.smallMoneyBag = new Audio();
    this.smallMoneyBag.src="assets/sound/moneyBag.mp3";
    this.smallMoneyBag.load();

  }

  playBackgroundOne(){
    this.bckMusicOne.play();
  }
  stopMusicBck(){
    this.bckMusicOne.pause();
  }

  playVillageMusic(){
    this.villageBck.play();
  }
  stopVillageMusic(){
    this.villageBck.pause();
  }

  throwFireball(){
    const newAudio = this.fireball.cloneNode();
    newAudio.volume = 0.03*this.globalVolume;
    newAudio.play()
  }
  throwSword(){
    this.swordThrow.play();
  }
  takeDamage(){
    const newAudio = this.takeDmg.cloneNode();
    newAudio.volume = 0.016*this.globalVolume;
    newAudio.play();
  }
  levelUp(){
    this.lvlUp.play();
  }
  win(){
    this.dead.play();
  }

  enemyDamage(){
    this.enemyDmg.play();
  }

  playBlock(){
    const newAudio = this.block.cloneNode();
    newAudio.volume = 0.015*this.globalVolume;
    newAudio.play();
  }
  enemyDead(){
    this.dead.play();
  }

  playerIsDead(){
    this.playerDead.play();
  }

  openSmallMoneyBag(){
    const newAudio = this.smallMoneyBag.cloneNode();
    newAudio.volume = 0.05*this.globalVolume;
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

    this.villageBck.volume = 0.02*this.globalVolume;


    this.fireball.volume=0.03*this.globalVolume;


    this.swordThrow.volume=0.03*this.globalVolume;


    this.enemyDmg.volume=0.015*this.globalVolume;

    this.takeDmg.volume=0.015*this.globalVolume;

    this.block.volume = 0.016*this.globalVolume;



    this.dead.volume=0.03*this.globalVolume;


    this.playerDead.volume=0.2*this.globalVolume;

  }



}
