import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from "./models/user.model";
import { Potion } from './models/potion.model';
import { CaveComponent } from './cave/cave.component';
import { AudioService } from '../audio.service';
import { DungeonsService } from '../dungeons.service';
import { ShopComponent } from './shop/shop.component';
import { ImagesService } from '../images.service';
import { CharacterComponent } from './character/character.component';
import { BackpackComponent } from './backpack/backpack.component';

@Component({
  selector: 'app-dungeons',
  templateUrl: './dungeons.component.html',
  styleUrls: ['./dungeons.component.scss']
})
export class DungeonsComponent implements OnInit {
 
  name: string = "Janke";
  inGame: boolean = true;
  @ViewChild(CaveComponent) cave: CaveComponent;
  @ViewChild(ShopComponent) shop: ShopComponent;
  @ViewChild(CharacterComponent) character: CharacterComponent;
  @ViewChild(BackpackComponent) backpack: BackpackComponent;

  player: User = new User();
  mainBck:any;

    
  ngOnInit(){
    this.start();
  }

  constructor(private audio: AudioService, private dungeons: DungeonsService, private images: ImagesService){
    this.player = {
      name: this.name,
      level: 1,
      exp: 590,
      gold: 10,
      basePoints: [0,0,0,0,0],
      strength: 7,
      damage: 2144,
      hitPoints: 812,
      health: 812,
      stamina: 20,
      staminaLeft: 20,
      speed:2,
      speedBuildUp:0,
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
      items: [new Potion(images.hpPotion,"hp",600)]
    }

    setTimeout(()=>{
      this.mainBck = this.images.bckMain;

      document.getElementById("cont").style.opacity = "1";
     
      let assets = document.getElementsByClassName('assets')[0];

      assets.appendChild(this.images.gold);
      assets.append(this.player.gold.toString());
    },10);

  }


  goToShop(){
    document.getElementById('mainBck').style.opacity='0';
   this.player.location = 'shop';
   setTimeout(()=>{
   this.shop.showPotions();
   },50);
  }
  goToBackpack(){
    document.getElementById('mainBck').style.opacity='0';
    this.player.location = "backpack";
    setTimeout(()=>{
      this.backpack.showBackpack();
      },50);
  }
 
  goToCharacter(){
    
   this.player.location = "character";
   setTimeout(()=>{
   this.character.countPotions();
   },100);
  }

  getDungeons(){
    return this.dungeons.dungeons;
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
    }
  }

  backHome(){
    this.player.location='home'; 
    this.player.gold+=this.player.goldInSack; 
    this.player.goldInSack=0;
    this.audio.stopDungeonMusic();
    this.audio.playBackgroundOne();
    setTimeout(()=>{

    let assets = document.getElementsByClassName('assets')[0];
    assets.innerHTML="";
    assets.appendChild(this.images.gold);
    assets.append(this.player.gold.toString());

    document.getElementById('mainBck').style.opacity='0.8';
      document.getElementById("cont").style.opacity = "1";
    },40);
   }


  // DUNGEONS

  goCave(lvl){
    if(lvl<=this.player.dungeon){
     this.player.location="dfight";
     setTimeout(()=>{
     this.cave.fight(lvl);
     },150);
    }
  }

  goToDungeon(){
      this.audio.stopMusicBck();
      this.audio.playDungeonsMusic();
      this.player.location="dungeons";
      setTimeout(()=>{
     document.getElementById('dungeons').style.opacity="1";
     document.getElementById('dungeons').appendChild(this.images.map);
    document.getElementById('mainBck').style.opacity='0';
      },60);
  }


}
