import { Component, Input } from '@angular/core';
import { User } from '../models/user.model';
import { MoneyBag } from '../models/moneyBag.model'
import { Enemy } from '../models/enemy.model';
import { PlayerAnimations } from '../animations/player.animation';
import { EnemyAnimations } from '../animations/enemy.animation';
import { AdditionAnimations } from '../animations/additions.animation';
import { AudioService } from '../../audio.service';
import { DungeonsService } from '../../dungeons.service';

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

  speed: number = 1;

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


  constructor(private audio: AudioService, private dungeons: DungeonsService){
    this.enemy = this.dungeons.dungeons[0].monsters[0]; 
  }



  backHome(){
    this.player.location='home'; 
    this.player.gold+=this.player.goldInSack; 
    this.player.goldInSack=0
   }


  tour(){



    this.playerTurn();

    let r = Math.random()*100;
   if(r<=92){
    setTimeout(()=>{
      if(this.enemy.health>0){
       this.enemyTurn();
      }
      else{
        this.enemyState = "die";
        this.showLoot = true;
        this.audio.enemyDead();
      }
    },1111*this.speed);
  }
  else{
    setTimeout(()=>{
  this.tour();
     },1111*this.speed);
  }
  }



  fight(lvl){


    if(lvl<=this.player.subdungeon){

      this.enemy.health = this.enemy.hitPoints;
      this.showLoot=false;
      this.enemyState='back';
      this.coins=[];
      this.tour();
      this.fighting = true;
    }
    else{
      this.player.location="dungeons";
    }

  }



  playerTurn(){

    setTimeout(()=>{
    this.playerAnimation = "playerTurn";
    },11*this.speed);

    setTimeout(()=>{
    this.playerAnimation = "back";
    this.swordAnimation = "throw";
    this.audio.throwSword();
    },411*this.speed)

    setTimeout(()=>{
      this.audio.enemyDamage();
      this.swordAnimation = "back";
      this.enemyState = "takeDamage";
      this.enemy.health-=this.player.damage;
    },711*this.speed);

    setTimeout(()=>{
      this.enemyState = "back";
      this.enemyDamage.push([this.player.damage,false]);
      setTimeout(()=>{
      this.enemyDamage[this.enemyDamage.length-1][1] = true;
      },10*this.speed);
    },911*this.speed);
    //t+=200;
    setTimeout(()=>{
      this.enemyDamage.shift();
    },2450*this.speed);


  }



  enemyTurn(){
    this.enemyState = "throwFireball";
    this.audio.throwFireball();

    setTimeout(()=>{
    this.audio.takeDamage();  
    this.enemyState = "back";
    this.enemyHit=true;
    this.player.health-=this.enemy.damage;
    },660*this.speed);
    setTimeout(()=>{
    this.enemyHit=false;
    this.playerDamage.push([this.enemy.damage,false]);
    setTimeout(()=>{
      this.playerDamage[this.playerDamage.length-1][1] = true;
      },10*this.speed);
    setTimeout(()=>{ 

      if(this.checkIfAlive()){
      this.tour();
      }

    },200*this.speed);
    },860*this.speed);
    setTimeout(()=>{
      this.playerDamage.shift();
    },2300*this.speed);
  }



  checkIfAlive(){
    if(this.player.health>0){

    return true;

    }else{

      this.audio.playerIsDead();
      return false

    }

  }
  
  showCoins(bag: MoneyBag){

     for(let i=0;i<bag.coins;i++){
      this.coins.push([1,'assets/game_coin.png',Math.random()*12-6+bag.offset,"static"]);
      let index = this.coins.length-1;
      setTimeout(()=>{
        this.coins[index][3]="collected";

        setTimeout(()=>{
        this.player.goldInSack++;
        },1200);

      },Math.random()*500+500);
     }

     let index = this.enemy.loot.indexOf(bag);  
     this.enemy.loot.splice(index,1);

     if(this.enemy.loot.length<1){
       setTimeout(()=>{
          this.fighting=false;
          this.player.subdungeon++;
          this.enemy = this.dungeons.dungeons[this.player.dungeon-1].monsters[this.player.subdungeon-1];
       },2200);
     }

     this.audio.openSmallMoneyBag();
  }

}
