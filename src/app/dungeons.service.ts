import { Injectable } from '@angular/core';
import { Dungeon } from './dungeons/models/dungeon.model';
import { Enemy } from './dungeons/models/enemy.model';
import { MoneyBag } from './dungeons/models/moneyBag.model';

@Injectable({
  providedIn: 'root'
})
export class DungeonsService {

  dungeons: Array<Dungeon> = [];


  constructor() { 

    this.dungeons.push(
      new Dungeon("assets/dungeon1.png",[ 
        new Enemy("assets/enemy1.png",this.getHitPoints(1,1),"Glimmerini",this.getDamage(1,1),1,this.createLoot(1,1)),
        new Enemy("assets/enemy1.png",this.getHitPoints(1,2),"Glimmerini",this.getDamage(1,2),1,this.createLoot(1,2)),
     new Enemy("assets/enemy1.png",this.getHitPoints(1,3),"Glimmerinio",this.getDamage(1,3),2,this.createLoot(1,3)),
    new Enemy("assets/enemy1.png",this.getHitPoints(1,4),"Glimmerinio",this.getDamage(1,4),3,this.createLoot(1,4)),
    new Enemy("assets/enemy1.png",this.getHitPoints(1,5),"Glimmer",this.getDamage(1,5),3,this.createLoot(1,5)),
     new Enemy("assets/enemy1.png",this.getHitPoints(1,6),"Glimmer",this.getDamage(1,6),4,this.createLoot(1,6)),
    new Enemy("assets/enemy1.png",this.getHitPoints(1,7),"Glimmer",this.getDamage(1,7),4,this.createLoot(1,7)),
    new Enemy("assets/enemy1.png",this.getHitPoints(1,8),"Glimmer v2",this.getDamage(1,8),4,this.createLoot(1,8)),
    new Enemy("assets/enemy1.png",this.getHitPoints(1,9),"Glimmer Alpha",this.getDamage(1,9),5,this.createLoot(1,9)),
    new Enemy("assets/enemy1.png",this.getHitPoints(1,10),"Glimmer Alpha",this.getDamage(1,10),5,this.createLoot(1,10))
    ],0,true));
    this.dungeons.push(
      new Dungeon("assets/dungeon2.png",[ 
        new Enemy("assets/enemy1.png",2193,"Glimmer",293,1,[
          new Enemy("assets/enemy1.png",this.getHitPoints(1,1),"Glimmerini",this.getDamage(1,1),1,this.createLoot(1,1)),
    ]
    )],0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon3.png",[ 
        new Enemy("assets/enemy1.png",2193,"Glimmer",293,1,[
          new Enemy("assets/enemy1.png",this.getHitPoints(1,1),"Glimmerini",this.getDamage(1,1),1,this.createLoot(1,1)),
    ]
    )],0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon4.png",[ 
        new Enemy("assets/enemy1.png",2193,"Glimmer",293,1,[
          new Enemy("assets/enemy1.png",this.getHitPoints(1,1),"Glimmerini",this.getDamage(1,1),1,this.createLoot(1,1)),
    ]
    )],0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon5.png",[
         new Enemy("assets/enemy1.png",2193,"Glimmer",293,1,[
          new Enemy("assets/enemy1.png",this.getHitPoints(1,1),"Glimmerini",this.getDamage(1,1),1,this.createLoot(1,1)),
    ]
    )],0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon6.png",[ 
        new Enemy("assets/enemy1.png",2193,"Glimmer",293,1,[
          new Enemy("assets/enemy1.png",this.getHitPoints(1,1),"Glimmerini",this.getDamage(1,1),1,this.createLoot(1,1)),
    ]
    )],0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon7.png",[ 
        new Enemy("assets/enemy1.png",2193,"Glimmer",293,1,[
          new Enemy("assets/enemy1.png",this.getHitPoints(1,1),"Glimmerini",this.getDamage(1,1),1,this.createLoot(1,1)),
      ]
    )],0,false));

    this.dungeons.push(
      new Dungeon("assets/dungeon8.png",[
        new Enemy("assets/enemy1.png",2193,"Glimmer",293,1,[
          new Enemy("assets/enemy1.png",this.getHitPoints(1,1),"Glimmerini",this.getDamage(1,1),1,this.createLoot(1,1)),
        ]
    )],0,false));

    this.dungeons.push(
      new Dungeon("assets/dungeon9.png",[
        new Enemy("assets/enemy1.png",2193,"Glimmer",293,1,[
          new Enemy("assets/enemy1.png",this.getHitPoints(1,1),"Glimmerini",this.getDamage(1,1),1,this.createLoot(1,1)),
      ]
    )],0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon10.png",[
        new Enemy("assets/enemy1.png",2193,"Glimmer",293,1,[
          new Enemy("assets/enemy1.png",this.getHitPoints(1,1),"Glimmerini",this.getDamage(1,1),1,this.createLoot(1,1)),
      ]
    )],0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon11.png",[
        new Enemy("assets/enemy1.png",2193,"Glimmer",293,1,[
          new Enemy("assets/enemy1.png",this.getHitPoints(1,1),"Glimmerini",this.getDamage(1,1),1,this.createLoot(1,1)),
      ]
    )],0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon12.png",[
        new Enemy("assets/enemy1.png",2193,"Glimmer",293,1,[
          new Enemy("assets/enemy1.png",this.getHitPoints(1,1),"Glimmerini",this.getDamage(1,1),1,this.createLoot(1,1)),
      ]
    )],0,false));


  }



  getHitPoints(dungeon: number,subdungeon: number){

     return Math.round(dungeon*subdungeon*Math.random()*30+70*subdungeon);

  }
  getDamage(dungeon: number,subdungeon: number){

    return Math.round(dungeon*subdungeon*(Math.random()*3+5));

 }

 createLoot(dungeon: number, subdungeon: number){

     let amount = Math.round(Math.random()*subdungeon*dungeon)+1;
     let loot = [];

     for(let i=0;i<amount;i++){
         let coins = Math.round(Math.random()*3+2)+Math.round(Math.random()*0.7)*10;
         let src,size;
         if(coins>10)
         {
           src = "assets/bigMoneySack.png";
           size = "bigMoneyBag";

         }else{
           src = "assets/smallMoneySack.png"
           size = "smallMoneyBag";
         }
         

         loot.push(new MoneyBag(coins,src,Math.random()*30-15,src));
     }

     return loot;
 
 }


  fillDungeon(){

  }
}
