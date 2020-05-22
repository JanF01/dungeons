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

  speed: number = 0.1;

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

  playerIsDead: boolean =  false;


  constructor(private audio: AudioService, private dungeons: DungeonsService, private images:ImagesService){
    this.enemy = this.dungeons.dungeons[0].monsters[0]; 
  }



  backHome(){
    this.player.location='home'; 
    this.player.gold+=this.player.goldInSack; 
    this.player.goldInSack=0
    this.audio.stopDungeonMusic();
    this.audio.playBackgroundOne();
   }
   goBackToMap(){
    this.player.location='dungeons';
    this.audio.dungeonsBck.volume=0.09;
    setTimeout(()=>{
      document.getElementById('dungeons').style.opacity="1";
      document.getElementById('dungeons').appendChild(this.images.map);
       },60);
   }

   enemyDead(){
    this.enemyState = "die";
    this.showLoot = true;
    this.audio.enemyDead();

    if(this.player.subdungeon>this.dungeons.dungeons[this.player.dungeon-1].completed){
    this.dungeons.dungeons[this.player.dungeon-1].completed++;
    }
   }



  tour(){

  this.playerTurn();

   if(Math.random()*100<=(100-this.player.speed*2)){
    setTimeout(()=>{ (this.enemy.health>0) ? this.enemyTurn() : this.enemyDead(); }, 1111*this.speed);
  }
  else{
    setTimeout(()=>{ this.tour(); },1111*this.speed);
  }

}

nextFight(lvl){
  
    document.getElementById('d').style.opacity="1";
    document.getElementById('d').appendChild(this.images.map);


  this.enemy = this.dungeons.dungeons[lvl-1].monsters[this.player.subdungeon-1]; 

  this.enemy.health = this.enemy.hitPoints;
  this.showLoot=false;
  this.enemyState='back';
  this.coins=[];

  this.fighting = true;

}


  fight(lvl){


    if(lvl<=this.player.subdungeon){
      this.audio.dungeonsBck.volume=0.03;
      this.nextFight(lvl);
      this.tour();
    }else{
      this.player.location="dungeons";
    }

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

     for(let i=bag.coins;i>0;){
     if(i>=10){
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
        },1200);

      },Math.random()*500+500);

     }

     let index = this.enemy.loot.indexOf(bag);  
     this.enemy.loot.splice(index,1);

     if(this.enemy.loot.length<1){

       setTimeout(()=>{ this.nextDungeon(); },2200);

     }

     this.audio.openSmallMoneyBag();

  }

  nextDungeon(){
    this.fighting=false;
    this.player.subdungeon++;
    this.enemy = this.dungeons.dungeons[this.player.dungeon-1].monsters[this.player.subdungeon-1];
  }


  //Status check

  checkIfAlive = () => { return this.player.health>0 ? true: this.playerDead() };





  //Animations


  //Player Animations

  playerDead(){

    this.audio.playerIsDead();
    this.playerIsDead = true;
    this.player.goldInSack=0;
    this.player.subdungeon=1;

    setTimeout(()=>{
    this.backHome();
    this.player.health = this.player.hitPoints;
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
    this.enemy.health-=this.player.damage;
  }

  playerHurt(){
    this.enemyHit=false;
    this.playerDamage.push([this.enemy.damage,false]);
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
    this.player.health-=this.enemy.damage;
  }

  enemyHurt(){
    this.enemyState = "back";
    this.enemyDamage.push([this.player.damage,false]);

    setTimeout(()=>{ 
      this.enemyDamage[this.enemyDamage.length-1][1] = true; 
    },10*this.speed);

    setTimeout(()=>{
      this.enemyDamage.shift();
    },2449);

  }




}
