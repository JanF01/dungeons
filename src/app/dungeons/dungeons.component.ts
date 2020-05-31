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
import { Item } from './models/item.model';
import { Armor } from './models/items/armor.model';
import { Weapon } from './models/items/weapon.model';
import { Necklace } from './models/items/necklace.model';
import { Ring } from './models/items/ring.model';
import { VillageComponent } from './village/village.component';
import { Crystal } from './models/items/crystal.model';

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
  @ViewChild(VillageComponent) village: VillageComponent;

  player: User = new User();
  mainBck:any;

    
  ngOnInit(){
    this.start();
  }

  constructor(private audio: AudioService, private dungeons: DungeonsService, private images: ImagesService){
    this.player = {
      name: this.name,
      level: 1,
      exp: 0,
      nextExp: 782,
      gold: 10,
      basePoints: [0,0,0,0,0],
      strength: 6,
      damage: 18,
      hitPoints: 798,
      health: 798,
      stamina: 20,
      staminaLeft: 20,
      speed:2,
      speedBuildUp:0,
      luck: 0,
      location: "home",
      dungeon: 0,
      subdungeon: [0,0,0,0,0,0,0,0,0,0,0,0],
      goldInSack: 0,
      graphic: "assets/knight1.png",
      weapon: new Weapon("legend","Dagger of Doom","assets/weapon/1_1.png","#00A9A","darkness",15,3,4.2,100),
      armor: new Armor("normal","Feeble Armor","assets/armor/1_1.png","#00B11","none",10,39,10,100),
      necklace: new Necklace("normal","Rat's Collar","assets/necklace/1_1.png","#00C01","fire",21,15,0.06),
      ring: new Ring("normal","Rat's Collar","assets/ring/1_1.png","#00C01","none",33,10,0.3),
      potions: [new Potion("Health I",images.hpPotion,"hp",600,"HP Potion")],
      items: [new Weapon("artefact","Dev Dagger #EZ","assets/weapon/swordDev.png","#00A9A","fire",92441,2000,4000,100),
      new Armor("legend","Invincible Armor","assets/armor/1_2.png","#00B11","none",42032,12000,60,100),
      new Weapon("normal","Random Weapon","assets/weapon/1_4.png","#00C02","ice",63,7,11,100),
      new Crystal("artefact","Crystal of Destruction","assets/crystal/artefact_dmg.png","#00E92","none",121,"dmg",0.25),
      new Crystal("normal","Small Speed Crystal","assets/crystal/normal_speed.png","#00E03","none",12,"speed",2),
      new Crystal("legend","Glowing HP Crystal","assets/crystal/legend_hp.png","#00E18","none",68,"hp",0.12),
      new Crystal("legend","Big Crystal of Exp","assets/crystal/legend_exp.png","#00E13","none",87,"exp",0.11)],
      itemsOnHold:[],
      loot: []
    }
    this.player.stamina+=this.player.necklace.stamina+this.player.ring.stamina;

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

  goToVillage(){
    document.getElementById('mainBck').style.opacity='0';
    this.player.location = "village";
    setTimeout(()=>{
      document.getElementById('village').style.opacity="1";
      document.getElementById('village').appendChild(this.images.village);
     document.getElementById('mainBck').style.opacity='0';
     this.images.village.style.display='block';
      },50);
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

    while(this.player.loot[0]!=undefined){
      if(this.player.items.length<27){
          this.player.items.push(this.player.loot[0]);
      }
      this.player.loot.splice(0,1);
    }
    
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
    if(this.dungeons.dungeons[lvl-1].open){
     this.player.location="dfight";
     setTimeout(()=>{
     this.cave.fight(lvl);
     },100);
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
