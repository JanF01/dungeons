import { Injectable } from '@angular/core';
import { Dungeon } from './dungeons/models/dungeon.model';
import { Enemy } from './dungeons/models/enemy.model';
import { MoneyBag } from './dungeons/models/moneyBag.model';
import { Weapon } from './dungeons/models/items/weapon.model';
import { Armor } from './dungeons/models/items/armor.model';

@Injectable({
  providedIn: 'root'
})
export class DungeonsService {

  dungeons: Array<Dungeon> = [];


  constructor() { 

    this.dungeons.push(
      new Dungeon("assets/dungeon1.png",this.fillDungeon(1),0,true));
    this.dungeons.push(
      new Dungeon("assets/dungeon2.png",this.fillDungeon(2),0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon3.png",this.fillDungeon(3),0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon4.png",this.fillDungeon(4),0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon5.png",this.fillDungeon(5),0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon6.png",this.fillDungeon(6),0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon7.png",this.fillDungeon(7),0,false));

    this.dungeons.push(
      new Dungeon("assets/dungeon8.png",this.fillDungeon(8),0,false));

    this.dungeons.push(
      new Dungeon("assets/dungeon9.png",this.fillDungeon(9),0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon10.png",this.fillDungeon(10),0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon11.png",this.fillDungeon(11),0,false));
    this.dungeons.push(
      new Dungeon("assets/dungeon12.png",this.fillDungeon(12),0,false));


  }



  getHitPoints(dungeon: number,subdungeon: number){

    if(dungeon!=1) dungeon*=dungeon;

     return Math.round(dungeon*subdungeon*Math.random()*40+110*subdungeon*dungeon);

  }
  getDamage(dungeon: number,subdungeon: number){

    if(dungeon!=1) dungeon*=2.2;

    return Math.round(dungeon*subdungeon*1.2*(Math.random()*3+6));

 }


 createLoot(dungeon: number, subdungeon: number, level: number){


     let amount = Math.round(Math.random()*subdungeon*dungeon)+1;
     if(amount<2){
       amount++;
     }
     let loot = [];

     for(let i=amount;i>0;){
      let src,size;
      let coins = 0;
       if(i>10){
        coins = (Math.round(Math.random()*2+4))*8+Math.round(Math.random()*0.7)*20;
        src = "assets/hugeMoneySack.png";
        size = "hugeMoneyBag";
         i-=10;
       }
       else{
        coins = Math.round(Math.random()*3+1)+Math.round(Math.random()*0.7)*10;
         if(coins>10)
         {
           src = "assets/bigMoneySack.png";
           size = "bigMoneyBag";
         }else{
           src = "assets/smallMoneySack.png"
           size = "smallMoneyBag";
         }
         i--;
        }
         

         loot.push(new MoneyBag(coins,src,Math.random()*30-15,size));
    }
    
    let itemChance = Math.random();
    if(itemChance<0.18){
    loot.push(this.itemDrop(itemChance,dungeon,subdungeon,level));
    }

     return loot;
 
 }


itemDrop(IC,d,s,lvl){

  var item;

  let r = Math.round(Math.random()*lvl/2)+1+d;

  if(IC>0.10){
  item = new Weapon("normal","A Fricking Sword","assets/sword1.png","#00A11","none",Math.round(lvl*lvl*0.6),(Math.round(lvl*10)/10)+r,(Math.round(lvl*10)/10)+r+Math.round(lvl/4.5),100,Math.random()*30-15,"normal");
  }
  else if(IC>0.05){
    item = new Armor("normal","Shield Yourself","assets/armor1.png","#00B12","none",Math.round(lvl*lvl*0.6),Math.round(lvl*lvl/2)+r+30,5+Math.round(Math.random()*5),100,Math.random()*30-15,"normal");
  }
  else if(IC>0.03){
  item = new Weapon("legend","Holy Sword","assets/sword5.png","#00A42","fire",Math.round(lvl*lvl)+40,(Math.round(lvl*1.1*10)/10)+r,(Math.round(lvl*1.1*10)/10)+r+Math.round(lvl/3),100,Math.random()*30-15,"legend");
  }
  else if(IC>0.01){
    item = new Armor("legend","Holy Armor","assets/armor2.png","#00B43","none",Math.round(lvl*lvl),Math.round(lvl*lvl/1.4)+r+50,10+Math.round(Math.random()*10),100,Math.random()*30-15,"legend");
  }
  else if(IC>0.005){
    item = new Weapon("artefact","Lucky Needle","assets/sword3.png","#00A02","darkness",Math.round(lvl*lvl*1.3),(Math.round(lvl*1.2*10)/10)+r,(Math.round(lvl*1.2*10)/10)+r+Math.round(lvl/3)+lvl,100,Math.random()*30-15,"artefact");
  }
  else if(IC<=0.005){
    item = new Weapon("artefact","Foreknowing Armor AI","assets/armor3.png","#00B01","none",Math.round(lvl*lvl*1.3),Math.round(lvl*lvl)+r+70,10+Math.round(Math.random()*20),100,Math.random()*30-15,"artefact");
  }

  return item;
  
}






  monsters = [

    //Loch 1

    ["assets/enemy1.png","Glimmerini Aksmano",
    "assets/enemy2.png","Glimmerini Simp",
    "assets/enemy3.png","Glimmerinio Aksmanito",
    "assets/monster_it.png","IT",
    "assets/zubrowka.png","Wóda",
    "assets/malpka.png","Małpka",
    "assets/enemy3.png","Glimmer v2",
    "assets/monster_1.png","Devil Child",
    "assets/enemy5.png","Glimmer Alpha Man",
    "assets/enemy4.png","Glimmer Alpha +1",
    "assets/enemy5.png","Glimmer Pasja Programowanie",
    "assets/enemy6.png","Moving Dumpling",
    "assets/jerczak.jpg","Oktikk"],

    //Loch 2

    ["assets/enemy6.png","Moving Dumpling",
    "assets/monster_3eyesC.png","III Eyed Freak",
    "assets/enemy7.png","Talking Dumpling",
    "assets/monster_it.png","IT II",
    "assets/zubrowka.png","Wóda",
    "assets/malpka.png","Małpka",
    "assets/enemy8.png","Pissed Of Dumpling",
    "assets/enemy4.png","Glimmer Alpha",
    "assets/enemy5.png","Glimmer Alpha Man",
    "assets/enemy4.png","Glimmer Alpha +1",
    "assets/enemy5.png","Glimmer Pasja Programowanie",
    "assets/enemy5.png","Glimmer Alpha++",
    "assets/jerczak.jpg","Oktikk"],

    //Loch 3

    ["assets/enemy1.png","Glimmerini Aksmano",
    "assets/enemy2.png","Glimmerini Simp",
    "assets/enemy3.png","Glimmerinio Aksmanito",
    "assets/enemy2.png","Glimmerinio",
    "assets/zubrowka.png","Wóda",
    "assets/malpka.png","Małpka",
    "assets/enemy3.png","Glimmer v2",
    "assets/enemy4.png","Glimmer Alpha",
    "assets/enemy5.png","Glimmer Alpha Man",
    "assets/enemy4.png","Glimmer Alpha +1",
    "assets/enemy5.png","Glimmer Pasja Programowanie",
    "assets/enemy6.png","Glimmer Alpha++",
    "assets/jerczak.jpg","Oktikk"],

    //Loch 4

    ["assets/enemy1.png","Glimmerini Aksmano",
    "assets/enemy2.png","Glimmerini Simp",
    "assets/enemy3.png","Glimmerinio Aksmanito",
    "assets/enemy2.png","Glimmerinio",
    "assets/zubrowka.png","Wóda",
    "assets/malpka.png","Małpka",
    "assets/enemy3.png","Glimmer v2",
    "assets/enemy4.png","Glimmer Alpha",
    "assets/enemy5.png","Glimmer Alpha Man",
    "assets/enemy4.png","Glimmer Alpha +1",
    "assets/enemy5.png","Glimmer Pasja Programowanie",
    "assets/enemy6.png","Glimmer Alpha++",
    "assets/jerczak.jpg","Oktikk"],

    //Loch 5

    ["assets/enemy1.png","Glimmerini Aksmano",
    "assets/enemy2.png","Glimmerini Simp",
    "assets/enemy3.png","Glimmerinio Aksmanito",
    "assets/enemy2.png","Glimmerinio",
    "assets/zubrowka.png","Wóda",
    "assets/malpka.png","Małpka",
    "assets/enemy3.png","Glimmer v2",
    "assets/enemy4.png","Glimmer Alpha",
    "assets/enemy5.png","Glimmer Alpha Man",
    "assets/enemy4.png","Glimmer Alpha +1",
    "assets/enemy5.png","Glimmer Pasja Programowanie",
    "assets/enemy6.png","Glimmer Alpha++",
    "assets/jerczak.jpg","Oktikk"],

    //Loch 6

    ["assets/enemy1.png","Glimmerini Aksmano",
    "assets/enemy2.png","Glimmerini Simp",
    "assets/enemy3.png","Glimmerinio Aksmanito",
    "assets/enemy2.png","Glimmerinio",
    "assets/zubrowka.png","Wóda",
    "assets/malpka.png","Małpka",
    "assets/enemy3.png","Glimmer v2",
    "assets/enemy4.png","Glimmer Alpha",
    "assets/enemy5.png","Glimmer Alpha Man",
    "assets/enemy4.png","Glimmer Alpha +1",
    "assets/enemy5.png","Glimmer Pasja Programowanie",
    "assets/enemy6.png","Glimmer Alpha++",
    "assets/jerczak.jpg","Oktikk"],

    //Loch 7

    ["assets/enemy1.png","Glimmerini Aksmano",
    "assets/enemy2.png","Glimmerini Simp",
    "assets/enemy3.png","Glimmerinio Aksmanito",
    "assets/enemy2.png","Glimmerinio",
    "assets/zubrowka.png","Wóda",
    "assets/malpka.png","Małpka",
    "assets/enemy3.png","Glimmer v2",
    "assets/enemy4.png","Glimmer Alpha",
    "assets/enemy5.png","Glimmer Alpha Man",
    "assets/enemy4.png","Glimmer Alpha +1",
    "assets/enemy5.png","Glimmer Pasja Programowanie",
    "assets/enemy6.png","Glimmer Alpha++",
    "assets/jerczak.jpg","Oktikk"],
    //Loch 8

    ["assets/enemy1.png","Glimmerini Aksmano",
    "assets/enemy2.png","Glimmerini Simp",
    "assets/enemy3.png","Glimmerinio Aksmanito",
    "assets/enemy2.png","Glimmerinio",
    "assets/zubrowka.png","Wóda",
    "assets/malpka.png","Małpka",
    "assets/enemy3.png","Glimmer v2",
    "assets/enemy4.png","Glimmer Alpha",
    "assets/enemy5.png","Glimmer Alpha Man",
    "assets/enemy4.png","Glimmer Alpha +1",
    "assets/enemy5.png","Glimmer Pasja Programowanie",
    "assets/enemy6.png","Glimmer Alpha++",
    "assets/jerczak.jpg","Oktikk"],

    //Loch 9

    ["assets/enemy1.png","Glimmerini Aksmano",
    "assets/enemy2.png","Glimmerini Simp",
    "assets/enemy3.png","Glimmerinio Aksmanito",
    "assets/enemy2.png","Glimmerinio",
    "assets/zubrowka.png","Wóda",
    "assets/malpka.png","Małpka",
    "assets/enemy3.png","Glimmer v2",
    "assets/enemy4.png","Glimmer Alpha",
    "assets/enemy5.png","Glimmer Alpha Man",
    "assets/enemy4.png","Glimmer Alpha +1",
    "assets/enemy5.png","Glimmer Pasja Programowanie",
    "assets/enemy6.png","Glimmer Alpha++",
    "assets/jerczak.jpg","Oktikk"],

    //Loch 10

    ["assets/enemy1.png","Glimmerini Aksmano",
    "assets/enemy2.png","Glimmerini Simp",
    "assets/enemy3.png","Glimmerinio Aksmanito",
    "assets/enemy2.png","Glimmerinio",
    "assets/zubrowka.png","Wóda",
    "assets/malpka.png","Małpka",
    "assets/enemy3.png","Glimmer v2",
    "assets/enemy4.png","Glimmer Alpha",
    "assets/enemy5.png","Glimmer Alpha Man",
    "assets/enemy4.png","Glimmer Alpha +1",
    "assets/enemy5.png","Glimmer Pasja Programowanie",
    "assets/enemy6.png","Glimmer Alpha++",
    "assets/jerczak.jpg","Oktikk"],

    //Loch 11

    ["assets/enemy1.png","Glimmerini Aksmano",
    "assets/enemy2.png","Glimmerini Simp",
    "assets/enemy3.png","Glimmerinio Aksmanito",
    "assets/enemy2.png","Glimmerinio",
    "assets/zubrowka.png","Wóda",
    "assets/malpka.png","Małpka",
    "assets/enemy3.png","Glimmer v2",
    "assets/enemy4.png","Glimmer Alpha",
    "assets/enemy5.png","Glimmer Alpha Man",
    "assets/enemy4.png","Glimmer Alpha +1",
    "assets/enemy5.png","Glimmer Pasja Programowanie",
    "assets/enemy6.png","Glimmer Alpha++",
    "assets/jerczak.jpg","Oktikk"],
    //Loch 12

    ["assets/enemy1.png","Glimmerini Aksmano",
    "assets/enemy2.png","Glimmerini Simp",
    "assets/enemy3.png","Glimmerinio Aksmanito",
    "assets/enemy2.png","Glimmerinio",
    "assets/zubrowka.png","Wóda",
    "assets/malpka.png","Małpka",
    "assets/enemy3.png","Glimmer v2",
    "assets/enemy4.png","Glimmer Alpha",
    "assets/enemy5.png","Glimmer Alpha Man",
    "assets/enemy4.png","Glimmer Alpha +1",
    "assets/enemy5.png","Glimmer Pasja Programowanie",
    "assets/enemy6.png","Glimmer Alpha++",
    "assets/jerczak.jpg","Oktikk"],
  ];


  fillDungeon(dungeon){

    return [
    new Enemy(this.monsters[dungeon-1][0],this.getHitPoints(dungeon,1),this.monsters[dungeon-1][1],this.getDamage(dungeon,1),dungeon*dungeon,this.createLoot(dungeon,1,dungeon*dungeon)),
    new Enemy(this.monsters[dungeon-1][2],this.getHitPoints(dungeon,2),this.monsters[dungeon-1][3],this.getDamage(dungeon,2),dungeon*dungeon,this.createLoot(dungeon,2,dungeon*dungeon)),
    new Enemy(this.monsters[dungeon-1][4],this.getHitPoints(dungeon,3),this.monsters[dungeon-1][5],this.getDamage(dungeon,3),dungeon*dungeon+1,this.createLoot(dungeon,3,dungeon*dungeon+1)),
    new Enemy(this.monsters[dungeon-1][6],this.getHitPoints(dungeon,4),this.monsters[dungeon-1][7],this.getDamage(dungeon,4),dungeon*dungeon+2,this.createLoot(dungeon,4,dungeon*dungeon+2)),
    new Enemy(this.monsters[dungeon-1][8],this.getHitPoints(dungeon,5),this.monsters[dungeon-1][9],this.getDamage(dungeon,5),dungeon*dungeon+2,this.createLoot(dungeon,5,dungeon*dungeon+2)),
    new Enemy(this.monsters[dungeon-1][10],this.getHitPoints(dungeon,6),this.monsters[dungeon-1][11],this.getDamage(dungeon,6),dungeon*dungeon+2,this.createLoot(dungeon,6,dungeon*dungeon+2)),
    new Enemy(this.monsters[dungeon-1][12],this.getHitPoints(dungeon,7),this.monsters[dungeon-1][13],this.getDamage(dungeon,7),dungeon*dungeon+3,this.createLoot(dungeon,7,dungeon*dungeon+3)),
    new Enemy(this.monsters[dungeon-1][14],this.getHitPoints(dungeon,8),this.monsters[dungeon-1][15],this.getDamage(dungeon,8),dungeon*dungeon+3,this.createLoot(dungeon,8,dungeon*dungeon+3)),
    new Enemy(this.monsters[dungeon-1][16],this.getHitPoints(dungeon,9),this.monsters[dungeon-1][17],this.getDamage(dungeon,9),dungeon*dungeon+2,this.createLoot(dungeon,9,dungeon*dungeon+2)),
    new Enemy(this.monsters[dungeon-1][18],this.getHitPoints(dungeon,10),this.monsters[dungeon-1][19],this.getDamage(dungeon,10),dungeon*dungeon+5,this.createLoot(dungeon,10,dungeon*dungeon+5)),
    new Enemy(this.monsters[dungeon-1][20],this.getHitPoints(dungeon,11),this.monsters[dungeon-1][21],this.getDamage(dungeon,11),dungeon*dungeon+4,this.createLoot(dungeon,11,dungeon*dungeon+4)),
    new Enemy(this.monsters[dungeon-1][22],this.getHitPoints(dungeon,12),this.monsters[dungeon-1][23],this.getDamage(dungeon,12),dungeon*dungeon+6,this.createLoot(dungeon,12,dungeon*dungeon+6)),
    new Enemy(this.monsters[dungeon-1][24],this.getHitPoints(dungeon,13),this.monsters[dungeon-1][25],this.getDamage(dungeon,13),dungeon*dungeon+7,this.createLoot(dungeon,13,dungeon*dungeon+7))
    ];
  }


  reFillDungeon(dungeon){

    this.dungeons[dungeon].monsters = this.fillDungeon(dungeon+1);
  }

}
