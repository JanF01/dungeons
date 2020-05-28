import { Component, Input } from '@angular/core';
import { User } from '../models/user.model';
import { MoneyBag } from '../models/moneyBag.model'
import { Enemy } from '../models/enemy.model';
import { PlayerAnimations } from '../animations/player.animation';
import { EnemyAnimations } from '../animations/enemy.animation';
import { AdditionAnimations } from '../animations/additions.animation';
import { AudioService } from '../../audio.service';
import { DungeonsService } from '../../dungeons.service';
import { ImagesService } from '../../images.service';
import { Item } from '../models/item.model';
import { Weapon } from '../models/items/weapon.model';

@Component({
  selector: 'app-cave',
  templateUrl: './cave.component.html',
  styleUrls: ['./cave.component.scss'],
  animations: [
    PlayerAnimations.showUp,
    PlayerAnimations.momentum,
    PlayerAnimations.swordMomentum,
    PlayerAnimations.takeDamage,
    EnemyAnimations.enemyAnimation,
    EnemyAnimations.enemyAttack,
    AdditionAnimations.showDamage,
    AdditionAnimations.grabGold
  ]
})
export class CaveComponent {


  @Input('user') player: User;

  speed: number = 0.5;

  fighting: boolean = true; 

  coins: Array<any> = [];

  playerAnimation: string = "back";
  swordAnimation: string = "back";
  enemyState: string = "back";
  showDamage: boolean = false;
  enemyDamage: Array<any> = [];
  playerDamage: Array<any> = [];
  enemyHit: boolean = false;
  showLoot: boolean = false;
  showItemsLooted: boolean = false;
  enemy: Enemy;
  speedBuildUp = 0;
  potions = {
    hp: 0,
    stamina: 0,
    speed: 0
  };
  DI = 1;
  healing: any;

  monstersInCave: number = 0;

  playerIsDead: boolean =  false;


  constructor(private audio: AudioService, private dungeons: DungeonsService, private images:ImagesService){
    this.enemy = this.dungeons.dungeons[0].monsters[0]; 
  }



  backHome(){

    this.showItemsLooted=false;



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
    let mBck = document.getElementsByClassName('mainBck') as HTMLCollectionOf<HTMLElement>;
    mBck[0].style.opacity='0.8';
    document.getElementById("cont").style.opacity = "1";
 
    this.player.speed-=this.player.speedBuildUp;
    this.player.speedBuildUp=0;

    let assets = document.getElementsByClassName('assets')[0];
    assets.innerHTML="";
    assets.appendChild(this.images.gold);
    assets.append(this.player.gold.toString());
  },10);

   }

   goBackToMap(){

    this.showItemsLooted=false;

    this.player.location='dungeons';
    this.audio.dungeonsBck.volume=0.09;
    setTimeout(()=>{
      document.getElementById('dungeons').style.opacity="1";
      document.getElementById('dungeons').appendChild(this.images.map);
      this.player.speed-=this.player.speedBuildUp;
      this.player.speedBuildUp=0;
       },60);

   }






   enemyDead(){
    this.enemyState = "die";
    this.showLoot = true;
    this.audio.enemyDead();
    this.player.exp+=(this.player.dungeon+1)*(this.player.subdungeon[this.player.dungeon]+1)*34;

    if(this.player.exp>=this.player.nextExp){
      this.player.level++;
      this.player.nextExp = Math.round(this.player.level*(this.player.level*0.4)*1920);
      this.player.exp = 0;
    }
  
   }





  tour(){

    this.DI+=0.1;

  this.playerTurn();

   if(Math.random()*100<=(100-this.player.speed*2)){
    setTimeout(()=>{ (this.enemy.health>0) ? this.enemyTurn() : this.enemyDead(); }, 1111*this.speed);
  }
  else{
    setTimeout(()=>{ (this.enemy.health>0) ? this.tour() : this.enemyDead(); },1111*this.speed);
  }

}

nextFight(lvl){
  
    document.getElementById('d').style.opacity="1";
    document.getElementById('d').appendChild(this.images.map);


  this.enemy = this.dungeons.dungeons[lvl-1].monsters[this.player.subdungeon[this.player.dungeon]]; 

  this.enemy.health = this.enemy.hitPoints;
  this.showLoot=false;
  this.enemyState='back';
  this.coins=[];

  this.fighting = true;

}


  fight(lvl){

      this.showItemsLooted=false;

      clearInterval(this.healing);

      this.DI=1;
      this.potions.hp=0;
      this.potions.stamina=0;
      this.potions.speed=0;
      this.player.dungeon=lvl-1;

      this.monstersInCave = this.dungeons.dungeons[this.player.dungeon].monsters.length-1;


      this.enemy = this.dungeons.dungeons[this.player.dungeon].monsters[this.player.subdungeon[this.player.dungeon]];

      for(let i=0;i<this.player.potions.length;i++){
           switch(this.player.potions[i].type){
             case 'hp':
               this.potions.hp++;
             break;
             case 'stamina':
              this.potions.stamina++;
             break;
             case 'speed':
              this.potions.speed++;
             break;
           }
      }

      this.audio.dungeonsBck.volume=0.03;
      this.nextFight(lvl);
      this.tour();
  

  }

  critical = 1;

  playerTurn(){

    let dmg;

    setTimeout(()=>{
    this.playerAnimation = "playerTurn";

    Math.random()<this.player.necklace.critical?this.critical=1+this.player.ring.critM:this.critical=1;
    dmg = Math.round(this.player.strength*(this.player.weapon.damageLow+Math.random()*(this.player.weapon.damageHigh-this.player.weapon.damageLow))*this.critical);
       
  
    },11*this.speed);

    setTimeout(()=>{ this.throwSword(); },411*this.speed)

    setTimeout(()=>{ this.hitEnemy(dmg); },711*this.speed);

    setTimeout(()=>{ this.enemyHurt(dmg); },911*this.speed);

  }

  
  block = 0;
  blocked = false;
  
  enemyTurn(){
    this.enemyFireball();
    
    this.blocked=false;
    let dmg = 0;
    this.block = Math.random()*100;
    if(this.block<this.player.armor.chance){
      dmg = this.enemy.damage-this.player.armor.defence;
      this.blocked=true;
    }else{
    dmg = this.enemy.damage;
    }

    if(dmg<0) dmg=0;


    setTimeout(()=>{ this.enemyHitAnimation(dmg); },660*this.speed);
    

    setTimeout(()=>{
    
      this.playerHurt(dmg);


      setTimeout(()=>{ 

        if(this.checkIfAlive()) this.tour();
        
      },200*this.speed);

    },860*this.speed);

  }

  

  
  showCoins(bag: any){


    if(bag.perks!=undefined){
      this.showInfo(bag);
    }

   if(bag.coins!=undefined){

     for(let i=bag.coins+Math.random()*this.player.luck;i>0;){
      if(i>=30){
        this.coins.push([30,'assets/game_coin3.png',Math.random()*12-6+bag.offset,"static"]);
        i-=30;
       }
     else if(i>=10){
      this.coins.push([10,'assets/game_coin2.png',Math.random()*12-6+bag.offset,"static"]);
      i-=10;
     }
     else{
      this.coins.push([1,'assets/game_coin.png',Math.random()*12-6+bag.offset,"static"]);
      i-=1;
     }
      let index = this.coins.length-1;

      setTimeout(()=>{
        this.coins[index][3]="collected";

        setTimeout(()=>{
        this.player.goldInSack+=this.coins[index][0];
        },600);

      },Math.random()*300+100);

     }

     let index = this.enemy.loot.indexOf(bag);  
     this.enemy.loot.splice(index,1);

     if(this.enemy.loot.length<1){

       setTimeout(()=>{ this.nextDungeon(); },1000);

     }

     this.audio.openSmallMoneyBag();

    }

  }

  collectItem(item: Weapon){

      this.hideInfo();

      if(item.code!=undefined){

        if(this.player.loot.length<8){

       
          if(!this.player.loot.includes(item)){
          this.player.loot.push(item);
          }

        }
        
        setTimeout(()=>{

          let index = this.enemy.loot.indexOf(item); 
          this.enemy.loot.splice(index,1);

              if(this.enemy.loot.length<1){
              this.nextDungeon();
              }

          },600);

      }

  }

  nextDungeon(){
    this.fighting=false;
    if(this.player.subdungeon[this.player.dungeon]<this.dungeons.dungeons[this.player.dungeon].monsters.length-1){
    this.player.subdungeon[this.player.dungeon]++;
     this.enemy = this.dungeons.dungeons[this.player.dungeon].monsters[this.player.subdungeon[this.player.dungeon]];
    }
    else{

      this.dungeons.reFillDungeon(this.player.dungeon);
      if(this.player.subdungeon[this.player.dungeon]==this.dungeons.dungeons[this.player.dungeon].completed){
        this.dungeons.dungeons[this.player.dungeon].completed++;
        this.player.subdungeon[this.player.dungeon+1]=0;
        this.dungeons.dungeons[this.player.dungeon+1].open=true;
        }
  
      this.player.subdungeon[this.player.dungeon]=0;
      this.player.dungeon++;
      this.enemy = this.dungeons.dungeons[this.player.dungeon].monsters[this.player.subdungeon[this.player.dungeon]];
      this.goBackToMap();
    }
    if(this.player.subdungeon[this.player.dungeon]>this.dungeons.dungeons[this.player.dungeon].completed){
      this.dungeons.dungeons[this.player.dungeon].completed++;
      }
  }


  //Status check

  checkIfAlive = () => { return this.player.health>0 ? true: this.playerDead() };





  //Animations


  //Player Animations

  playerDead(){

    this.audio.playerIsDead();
    this.playerIsDead = true;
    this.player.goldInSack=0;

    this.player.subdungeon[this.player.dungeon]=0;

    this.player.loot = [];

    setTimeout(()=>{
    this.backHome();
    this.player.health = 0;
    this.healing = setInterval(()=>{
      if(this.player.health>this.player.hitPoints/2 || this.player.location=="dfight"){
        clearInterval(this.healing);
      }     
          this.player.health++;
          if(this.player.health>this.player.hitPoints) this.player.health=this.player.hitPoints;
    },400);

    this.dungeons.reFillDungeon(this.player.dungeon);
    },1500);

    return false;

  }

  throwSword(){
    this.playerAnimation = "back";
    this.swordAnimation = "throw";
    this.audio.throwSword();
  }

  hitEnemy(dmg){
    this.audio.enemyDamage();
    this.swordAnimation = "back";
    this.enemyState = "takeDamage";

    this.enemy.health-=Math.round(dmg*this.DI);
    if(this.enemy.health<0) this.enemy.health=0;
  }

  playerHurt(dmg){

    this.enemyHit=false;
    this.playerDamage.push([Math.round(dmg*this.DI),false]);
    setTimeout(()=>{

      this.playerDamage[this.playerDamage.length-1][1] = true;
      },10*this.speed);

      setTimeout(()=>{
        this.playerDamage.shift();
      },2350);
  }

//Enemy Animations

  enemyFireball(){
    this.enemyState = "throwFireball";
    this.audio.throwFireball();
  }

  enemyHitAnimation(dmg){
    this.enemyState = "back";
    if(dmg!=0){
      if(this.blocked){
        this.audio.playBlock();  
      }
      this.audio.takeDamage();  
      this.enemyHit=true;
    }
    else{
      this.audio.playBlock();  
    }
    this.player.health-=Math.round(dmg*this.DI);
    if(this.player.health<0) this.player.health=0;

    if(this.player.weapon.perks=="fire" || this.player.weapon.perks=="darkness" || this.player.weapon.perks=="ice"){
      this.player.health-=Math.round(dmg*this.DI*0.1);
    if(this.player.health<0) this.player.health=0;
      }
  }

  enemyHurt(dmg){
    this.enemyState = "back";
    this.enemyDamage.push([Math.round(dmg*this.DI),false,"normal"]);

    setTimeout(()=>{
    if(this.player.weapon.perks=="fire"){
    this.enemyDamage.push([Math.round(dmg*this.DI*0.1),false,"fire"]);
    }
    else if(this.player.weapon.perks=="darkness"){
    this.enemyDamage.push([Math.round(dmg*this.DI*0.1),false,"darkness"]);
    }
    else if(this.player.weapon.perks=="ice"){
      this.enemyDamage.push([Math.round(dmg*this.DI*0.1),false,"ice"]);
      }

      setTimeout(()=>{ 
        this.enemyDamage[this.enemyDamage.length-1][1] = true; 
      },10*this.speed);

      setTimeout(()=>{
        this.enemyDamage.shift();
      },2549);
  
    },500*this.speed);

    setTimeout(()=>{ 
      this.enemyDamage[this.enemyDamage.length-1][1] = true; 
    },10*this.speed);

    setTimeout(()=>{
      this.enemyDamage.shift();
    },2449);

  }




  //bubble

  itemForInfo: any;
  showInfoBubble = false;
  bubblePos = {x:180,y:180};

  showInfo(item){
  
      this.itemForInfo = item;
      this.showInfoBubble=true;

  }

  changePosition($event: MouseEvent){
     this.bubblePos.x = $event.clientX;
     this.bubblePos.y = $event.clientY;
  }

  hideInfo(){
    this.showInfoBubble=false;
  }




}
