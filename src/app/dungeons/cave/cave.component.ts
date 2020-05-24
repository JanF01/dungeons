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
  enemy: Enemy;
  speedBuildUp = 0;
  potions = {
    hp: 0,
    stamina: 0,
    speed: 0
  };
  DI = 1;

  monstersInCave: number = 0;

  playerIsDead: boolean =  false;


  constructor(private audio: AudioService, private dungeons: DungeonsService, private images:ImagesService){
    this.enemy = this.dungeons.dungeons[0].monsters[0]; 
  }



  backHome(){

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


    
      this.DI=1;
      this.potions.hp=0;
      this.potions.stamina=0;
      this.potions.speed=0;
      this.player.dungeon=lvl-1;

      this.monstersInCave = this.dungeons.dungeons[this.player.dungeon].monsters.length-1;


      this.enemy = this.dungeons.dungeons[this.player.dungeon].monsters[this.player.subdungeon[this.player.dungeon]];

      for(let i=0;i<this.player.items.length;i++){
           switch(this.player.items[i].type){
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



  playerTurn(){

    setTimeout(()=>{
    this.playerAnimation = "playerTurn";
    },11*this.speed);

    setTimeout(()=>{ this.throwSword(); },411*this.speed)

    setTimeout(()=>{ this.hitEnemy(); },711*this.speed);

    setTimeout(()=>{ this.enemyHurt(); },911*this.speed);

  }



  enemyTurn(){
    this.enemyFireball();

    setTimeout(()=>{ this.enemyHitAnimation(); },660*this.speed);

    setTimeout(()=>{
    
      this.playerHurt();


      setTimeout(()=>{ 

        if(this.checkIfAlive()) this.tour();
        
      },200*this.speed);

    },860*this.speed);

  }

  

  
  showCoins(bag: MoneyBag){

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

    setTimeout(()=>{
    this.backHome();
    this.player.health = 0;
    this.player.gold+=10;
    this.dungeons.reFillDungeon(this.player.dungeon);
    },1500);

    return false;

  }

  throwSword(){
    this.playerAnimation = "back";
    this.swordAnimation = "throw";
    this.audio.throwSword();
  }

  hitEnemy(){
    this.audio.enemyDamage();
    this.swordAnimation = "back";
    this.enemyState = "takeDamage";
    this.enemy.health-=Math.round(this.player.damage*this.DI);
    if(this.enemy.health<0) this.enemy.health=0;
  }

  playerHurt(){
    this.enemyHit=false;
    this.playerDamage.push([Math.round(this.enemy.damage*this.DI),false]);
    setTimeout(()=>{

      this.playerDamage[this.playerDamage.length-1][1] = true;3
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

  enemyHitAnimation(){
    this.audio.takeDamage();  
    this.enemyState = "back";
    this.enemyHit=true;
    this.player.health-=Math.round(this.enemy.damage*this.DI);
  }

  enemyHurt(){
    this.enemyState = "back";
    this.enemyDamage.push([Math.round(this.player.damage*this.DI),false]);

    setTimeout(()=>{ 
      this.enemyDamage[this.enemyDamage.length-1][1] = true; 
    },10*this.speed);

    setTimeout(()=>{
      this.enemyDamage.shift();
    },2449);

  }




}
