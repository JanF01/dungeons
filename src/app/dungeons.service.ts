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
        new Enemy(2193,2193,"Glimmer",229,1,[
          new MoneyBag(6,"assets/smallMoneySack.png",Math.random()*30-15),
          new MoneyBag(3,"assets/smallMoneySack.png",Math.random()*30-15)
      ]),
       new Enemy(7342,7342,"Glimmer",534,2,[
        new MoneyBag(7,"assets/smallMoneySack.png",Math.random()*30-15),
        new MoneyBag(3,"assets/smallMoneySack.png",Math.random()*30-15),
        new MoneyBag(4,"assets/smallMoneySack.png",Math.random()*30-15)
     ]),
     new Enemy(10242,10242,"Glimmer Alpha",934,4,[
      new MoneyBag(7,"assets/smallMoneySack.png",Math.random()*30-15),
      new MoneyBag(9,"assets/smallMoneySack.png",Math.random()*30-15),
      new MoneyBag(4,"assets/smallMoneySack.png",Math.random()*30-15)
   ]
    )],0,true));
    this.dungeons.push(
      new Dungeon("assets/dungeon2.png",[ 
        new Enemy(2193,2193,"Glimmer",293,1,[
          new MoneyBag(6,"assets/smallMoneySack.png",Math.random()*30-15),
          new MoneyBag(3,"assets/smallMoneySack.png",Math.random()*30-15)
    ]
    )],0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon3.png",[ 
        new Enemy(2193,2193,"Glimmer",293,1,[
          new MoneyBag(6,"assets/smallMoneySack.png",Math.random()*20-10),
          new MoneyBag(3,"assets/smallMoneySack.png",Math.random()*20-10)
    ]
    )],0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon4.png",[ 
        new Enemy(2193,2193,"Glimmer",293,1,[
          new MoneyBag(6,"assets/smallMoneySack.png",Math.random()*4),
          new MoneyBag(3,"assets/smallMoneySack.png",Math.random()*20-10)
    ]
    )],0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon5.png",[
         new Enemy(2193,2193,"Glimmer",293,1,[
            new MoneyBag(6,"assets/smallMoneySack.png",Math.random()*4),
            new MoneyBag(3,"assets/smallMoneySack.png",Math.random()*20-10)
    ]
    )],0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon6.png",[ 
        new Enemy(2193,2193,"Glimmer",293,1,[
          new MoneyBag(6,"assets/smallMoneySack.png",Math.random()*4),
          new MoneyBag(3,"assets/smallMoneySack.png",Math.random()*20-10)
    ]
    )],0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon7.png",[ 
        new Enemy(2193,2193,"Glimmer",293,1,[
          new MoneyBag(6,"assets/smallMoneySack.png",Math.random()*4),
          new MoneyBag(3,"assets/smallMoneySack.png",Math.random()*20-10)
      ]
    )],0,false));

    this.dungeons.push(
      new Dungeon("assets/dungeon8.png",[
        new Enemy(2193,2193,"Glimmer",293,1,[
          new MoneyBag(6,"assets/smallMoneySack.png",Math.random()*4),
          new MoneyBag(3,"assets/smallMoneySack.png",Math.random()*20-10)
        ]
    )],0,false));

    this.dungeons.push(
      new Dungeon("assets/dungeon9.png",[
        new Enemy(2193,2193,"Glimmer",293,1,[
          new MoneyBag(6,"assets/smallMoneySack.png",Math.random()*4),
          new MoneyBag(3,"assets/smallMoneySack.png",Math.random()*20-10)
      ]
    )],0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon10.png",[
        new Enemy(2193,2193,"Glimmer",293,1,[
          new MoneyBag(6,"assets/smallMoneySack.png",Math.random()*4),
          new MoneyBag(3,"assets/smallMoneySack.png",Math.random()*20-10)
      ]
    )],0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon11.png",[
        new Enemy(2193,2193,"Glimmer",293,1,[
          new MoneyBag(6,"assets/smallMoneySack.png",Math.random()*4),
          new MoneyBag(3,"assets/smallMoneySack.png",Math.random()*20-10)
      ]
    )],0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon12.png",[
        new Enemy(2193,2193,"Glimmer",293,1,[
          new MoneyBag(6,"assets/smallMoneySack.png",Math.random()*4),
          new MoneyBag(3,"assets/smallMoneySack.png",Math.random()*20-10)
      ]
    )],0,false));


  }
}
