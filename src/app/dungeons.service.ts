import { Injectable } from '@angular/core';
import { Dungeon } from './dungeons/models/dungeon.model';
import { Enemy } from './dungeons/models/enemy.model';
import { MoneyBag } from './dungeons/models/moneyBag.model';
import { Weapon } from './dungeons/models/items/weapon.model';
import { Armor } from './dungeons/models/items/armor.model';
import { ImagesService } from './images.service';
import { Necklace } from './dungeons/models/items/necklace.model';
import { Ring } from './dungeons/models/items/ring.model';

@Injectable({
  providedIn: 'root'
})
export class DungeonsService {

  dungeons: Array<Dungeon> = [];


  constructor(private images: ImagesService) { 

    this.dungeons.push(
      new Dungeon("assets/dungeon/1.png",this.fillDungeon(1),0,true,0));
    this.dungeons.push(
      new Dungeon("assets/dungeon/2.png",this.fillDungeon(2),0,false,0));
    this.dungeons.push(
      new Dungeon("assets/dungeon/3.png",this.fillDungeon(3),0,false,0));
    this.dungeons.push(
      new Dungeon("assets/dungeon/4.png",this.fillDungeon(4),0,false,0));
    this.dungeons.push(
      new Dungeon("assets/dungeon/5.png",this.fillDungeon(5),0,false,0));
    this.dungeons.push(
      new Dungeon("assets/dungeon/6.png",this.fillDungeon(6),0,false,0));
    this.dungeons.push(
      new Dungeon("assets/dungeon/7.png",this.fillDungeon(7),0,false,0));

    this.dungeons.push(
      new Dungeon("assets/dungeon/8.png",this.fillDungeon(8),0,false,0));

    this.dungeons.push(
      new Dungeon("assets/dungeon/9.png",this.fillDungeon(9),0,false,0));
    this.dungeons.push(
      new Dungeon("assets/dungeon/10.png",this.fillDungeon(10),0,true,0));
    this.dungeons.push(
      new Dungeon("assets/dungeon/11.png",this.fillDungeon(11),0,true,0));
    this.dungeons.push(
      new Dungeon("assets/dungeon/12.png",this.fillDungeon(12),0,true,0));

     for(let i=0;i<12;i++){
      this.dungeons[i].amount = this.dungeons[i].monsters.length;
     }
  }



  getHitPoints(dungeon: number,subdungeon: number){

    if(dungeon!=1) dungeon*=dungeon+dungeon/2;

     return Math.round(dungeon*subdungeon*Math.random()*40+110*subdungeon*dungeon);

  }
  getDamage(dungeon: number,subdungeon: number){
    
    if(dungeon>5) dungeon*=dungeon/2;
    else if(dungeon>8) dungeon*=dungeon;
    else if(dungeon!=1) dungeon*=2.2;
     


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
        src = "assets/bag/huge.png";
        size = "hugeMoneyBag";
         i-=10;
       }
       else{
        coins = Math.round(Math.random()*3+1)+Math.round(Math.random()*0.7)*10;
         if(coins>10)
         {
           src = "assets/bag/big.png";
           size = "bigMoneyBag";
         }else{
           src = "assets/bag/small.png";
           size = "smallMoneyBag";
         }
         i--;
        }
         

         loot.push(new MoneyBag(coins,src,Math.random()*30-15,size));
    }
    
    let itemChance = Math.random();
    if(itemChance<0.22){
    loot.push(this.itemDrop(itemChance,dungeon,subdungeon,level));
    }

     return loot;
 
 }


itemDrop(IC,d,s,lvl){

  var item;

  let r = Math.round(Math.random()*lvl/2)+1+d*3;
  let w = "2_";
  let a = "2_";

  if(d==1 || d==3){
     w="1_";
     a = "1_";
  }

  if(IC>0.14){
  item = new Weapon("normal","A Fricking Sword","assets/weapon/"+w+"1.png","#00A11","none",Math.round(lvl*lvl*0.4),(Math.round(lvl*12)/10)+r,(Math.round(lvl*12)/10)+r+Math.round(lvl/4.5),100,Math.random()*30-15,"normal");
  }
  else if(IC>0.09){
    item = new Armor("normal","Shield Yourself","assets/armor/"+a+"1.png","#00B12","none",Math.round(lvl*lvl*0.4),Math.round(lvl*lvl/2)+r+30,5+Math.round(Math.random()*5),100,Math.random()*30-15,"normal");
  }
  else if(IC>0.07){
  item = new Weapon("legend","Holy Sword","assets/weapon/"+w+"2.png","#00A42","fire",Math.round(lvl*lvl*0.7)+40,(Math.round(lvl*14)/10)+r,(Math.round(lvl*14)/10)+r+Math.round(lvl/3),100,Math.random()*30-15,"legend");
  }
  else if(IC>0.05){
    item = new Armor("legend","Holy Armor","assets/armor/"+a+"2.png","#00B43","none",Math.round(lvl*lvl*0.7),Math.round(lvl*lvl/1.4)+r+50,10+Math.round(Math.random()*10),100,Math.random()*30-15,"legend");
  }
  else if(IC>0.045){
    item = new Weapon("artefact","Lucky Needle","assets/weapon/"+w+"3.png","#00A02","darkness",Math.round(lvl*lvl),(Math.round(lvl*16)/10)+r,(Math.round(lvl*16)/10)+r+Math.round(lvl/2.5)+lvl,100,Math.random()*30-15,"artefact");
  }
  else if(IC>0.04){
    item = new Armor("artefact","Foreknowing Armor AI","assets/armor/"+a+"3.png","#00B01","none",Math.round(lvl*lvl),Math.round(lvl*lvl)+r+70,10+Math.round(Math.random()*20),100,Math.random()*30-15,"artefact");
  }
  else if(IC>0.027){
    item = new Necklace("normal","Necklace of Wisdom","assets/necklace/1_1.png","#00C01","none",Math.round(lvl*lvl),lvl*4,Math.round(Math.random()*8+2)/100,Math.random()*30-15,"normal");
  }
  else if(IC>0.014){
    item = new Ring("normal","Ring of Wisdom","assets/ring/1_1.png","#00D01","none",Math.round(lvl*lvl),lvl*4,Math.round(Math.random()*35+25)/100,Math.random()*30-15,"normal");
  }
  else if(IC>0.009){
    item = new Necklace("legend","Necklace on Fire","assets/necklace/1_2.png","#00C02","fire",Math.round(lvl*lvl*1.2),lvl*6,Math.round(Math.random()*8+8)/100,Math.random()*30-15,"legend");
  }
  else if(IC>0.004){
    item = new Ring("legend","Ring of Darkness","assets/ring/1_2.png","#00D02","darkness",Math.round(lvl*lvl*1.2),lvl*6,Math.round(Math.random()*50+50)/100,Math.random()*30-15,"legend");
  }
  else if(IC>0.002){
    item = new Necklace("artefact","Necklace 1/500","assets/necklace/1_2.png","#00C03","fire",Math.round(lvl*lvl*1.3),lvl*9,Math.round(Math.random()*10+10)/100,Math.random()*30-15,"artefact");
  }
  else if(IC<=0.002){
    item = new Ring("artefact","Ring 1/500","assets/ring/1_2.png","#00D03","darkness",Math.round(lvl*lvl*1.3),lvl*9,Math.round(Math.random()*100+75)/100,Math.random()*30-15,"artefact");
  }

  return item;
  
}






  monsters = [

    //Loch 1

    ["assets/monster/1_1.png","Glimmerini Aksmano",
    "assets/monster/1_2.png","Glimmerini Simp",
    "assets/monster/1_3.png","Glimmerinio Aksmanito",
    "assets/monster/1_6.png","Mazgor",
    "assets/monster/1_9.png","Wóda",
    "assets/monster/1_8.png","Małpka",
    "assets/monster/1_3.png","Glimmer v2",
    "assets/monster/1_7.png","Devil Child",
    "assets/monster/1_5.png","Glimmer Alpha Man",
    "assets/monster/1_4.png","Glimmer Alpha +1",
    "assets/monster/2_5.png","Mazgor Pasja Programowanie",
    "assets/monster/2_1.png","Moving Dumpling",
    "assets/monster/1_10B.jpg","Oktikk"],

    //Loch 2

    ["assets/monster/2_1.png","Moving Dumpling",
    "assets/monster/2_4.png","III Eyed Freak",
    "assets/monster/2_2.png","Talking Dumpling",
    "assets/monster/1_6.png","Mazgor II",
    "assets/monster/1_9.png","Wóda",
    "assets/monster/1_8.png","Małpka",
    "assets/monster/2_3.png","Pissed Of Dumpling",
    "assets/monster/1_4.png","Glimmer Alpha",
    "assets/monster/2_5.png","Mazgor Tiny",
    "assets/monster/1_4.png","Glimmer Alpha +1",
    "assets/monster/2_6.png","Mazgor Elite",
    "assets/monster/2_7.png","???",
    "assets/monster/2_8B.png","Mazgori Cesar"],

    //Loch 3

    ["assets/monster/2_1.png","Moving Dumpling",
    "assets/monster/2_4.png","III Eyed Freak",
    "assets/monster/2_2.png","Talking Dumpling",
    "assets/monster/1_6.png","IT II",
    "assets/monster/1_9.png","Wóda",
    "assets/monster/1_8.png","Małpka",
    "assets/monster/2_3.png","Pissed Of Dumpling",
    "assets/monster/1_4.png","Glimmer Alpha",
    "assets/monster/1_5.png","Glimmer Alpha Man",
    "assets/monster/1_4.png","Glimmer Alpha +1",
    "assets/monster/1_5.png","Glimmer Pasja Programowanie",
    "assets/monster/1_5.png","Glimmer Alpha++",
    "assets/monster/1_10B.jpg","Oktikk"],

    //Loch 4

    ["assets/monster/2_1.png","Moving Dumpling",
    "assets/monster/2_4.png","III Eyed Freak",
    "assets/monster/2_2.png","Talking Dumpling",
    "assets/monster/1_6.png","IT II",
    "assets/monster/1_9.png","Wóda",
    "assets/monster/1_8.png","Małpka",
    "assets/monster/2_3.png","Pissed Of Dumpling",
    "assets/monster/1_4.png","Glimmer Alpha",
    "assets/monster/1_5.png","Glimmer Alpha Man",
    "assets/monster/1_4.png","Glimmer Alpha +1",
    "assets/monster/1_5.png","Glimmer Pasja Programowanie",
    "assets/monster/1_5.png","Glimmer Alpha++",
    "assets/monster/1_10B.jpg","Oktikk"],

    //Loch 5

    ["assets/monster/2_1.png","Moving Dumpling",
    "assets/monster/2_4.png","III Eyed Freak",
    "assets/monster/2_2.png","Talking Dumpling",
    "assets/monster/1_6.png","IT II",
    "assets/monster/1_9.png","Wóda",
    "assets/monster/1_8.png","Małpka",
    "assets/monster/2_3.png","Pissed Of Dumpling",
    "assets/monster/1_4.png","Glimmer Alpha",
    "assets/monster/1_5.png","Glimmer Alpha Man",
    "assets/monster/1_4.png","Glimmer Alpha +1",
    "assets/monster/1_5.png","Glimmer Pasja Programowanie",
    "assets/monster/1_5.png","Glimmer Alpha++",
    "assets/monster/1_10B.jpg","Oktikk"],

    //Loch 6

    ["assets/monster/2_1.png","Moving Dumpling",
    "assets/monster/2_4.png","III Eyed Freak",
    "assets/monster/2_2.png","Talking Dumpling",
    "assets/monster/1_6.png","IT II",
    "assets/monster/1_9.png","Wóda",
    "assets/monster/1_8.png","Małpka",
    "assets/monster/2_3.png","Pissed Of Dumpling",
    "assets/monster/1_4.png","Glimmer Alpha",
    "assets/monster/1_5.png","Glimmer Alpha Man",
    "assets/monster/1_4.png","Glimmer Alpha +1",
    "assets/monster/1_5.png","Glimmer Pasja Programowanie",
    "assets/monster/1_5.png","Glimmer Alpha++",
    "assets/monster/1_10B.jpg","Oktikk"],

    //Loch 7

    ["assets/monster/2_1.png","Moving Dumpling",
    "assets/monster/2_4.png","III Eyed Freak",
    "assets/monster/2_2.png","Talking Dumpling",
    "assets/monster/1_6.png","IT II",
    "assets/monster/1_9.png","Wóda",
    "assets/monster/1_8.png","Małpka",
    "assets/monster/2_3.png","Pissed Of Dumpling",
    "assets/monster/1_4.png","Glimmer Alpha",
    "assets/monster/1_5.png","Glimmer Alpha Man",
    "assets/monster/1_4.png","Glimmer Alpha +1",
    "assets/monster/1_5.png","Glimmer Pasja Programowanie",
    "assets/monster/1_5.png","Glimmer Alpha++",
    "assets/monster/1_10B.jpg","Oktikk"],
    //Loch 8

    ["assets/monster/2_1.png","Moving Dumpling",
    "assets/monster/2_4.png","III Eyed Freak",
    "assets/monster/2_2.png","Talking Dumpling",
    "assets/monster/1_6.png","IT II",
    "assets/monster/1_9.png","Wóda",
    "assets/monster/1_8.png","Małpka",
    "assets/monster/2_3.png","Pissed Of Dumpling",
    "assets/monster/1_4.png","Glimmer Alpha",
    "assets/monster/1_5.png","Glimmer Alpha Man",
    "assets/monster/1_4.png","Glimmer Alpha +1",
    "assets/monster/1_5.png","Glimmer Pasja Programowanie",
    "assets/monster/1_5.png","Glimmer Alpha++",
    "assets/monster/1_10B.jpg","Oktikk"],

    //Loch 9

    ["assets/monster/2_1.png","Moving Dumpling",
    "assets/monster/2_4.png","III Eyed Freak",
    "assets/monster/2_2.png","Talking Dumpling",
    "assets/monster/1_6.png","IT II",
    "assets/monster/1_9.png","Wóda",
    "assets/monster/1_8.png","Małpka",
    "assets/monster/2_3.png","Pissed Of Dumpling",
    "assets/monster/1_4.png","Glimmer Alpha",
    "assets/monster/1_5.png","Glimmer Alpha Man",
    "assets/monster/1_4.png","Glimmer Alpha +1",
    "assets/monster/1_5.png","Glimmer Pasja Programowanie",
    "assets/monster/1_5.png","Glimmer Alpha++",
    "assets/monster/1_10B.jpg","Oktikk"],

    //Loch 10

    ["assets/monster/2_1.png","Moving Dumpling",
    "assets/monster/2_4.png","III Eyed Freak",
    "assets/monster/2_2.png","Talking Dumpling",
    "assets/monster/1_6.png","IT II",
    "assets/monster/1_9.png","Wóda",
    "assets/monster/1_8.png","Małpka",
    "assets/monster/2_3.png","Pissed Of Dumpling",
    "assets/monster/1_4.png","Glimmer Alpha",
    "assets/monster/1_5.png","Glimmer Alpha Man",
    "assets/monster/1_4.png","Glimmer Alpha +1",
    "assets/monster/1_5.png","Glimmer Pasja Programowanie",
    "assets/monster/1_5.png","Glimmer Alpha++",
    "assets/monster/1_10B.jpg","Oktikk"],

    //Loch 11

    ["assets/monster/2_1.png","Moving Dumpling",
    "assets/monster/2_4.png","III Eyed Freak",
    "assets/monster/2_2.png","Talking Dumpling",
    "assets/monster/1_6.png","IT II",
    "assets/monster/1_9.png","Wóda",
    "assets/monster/1_8.png","Małpka",
    "assets/monster/2_3.png","Pissed Of Dumpling",
    "assets/monster/1_4.png","Glimmer Alpha",
    "assets/monster/1_5.png","Glimmer Alpha Man",
    "assets/monster/1_4.png","Glimmer Alpha +1",
    "assets/monster/1_5.png","Glimmer Pasja Programowanie",
    "assets/monster/1_5.png","Glimmer Alpha++",
    "assets/monster/1_10B.jpg","Oktikk"],
    //Loch 12

    ["assets/monster/2_1.png","Moving Dumpling",
    "assets/monster/2_4.png","III Eyed Freak",
    "assets/monster/2_2.png","Talking Dumpling",
    "assets/monster/1_6.png","IT II",
    "assets/monster/1_9.png","Wóda",
    "assets/monster/1_8.png","Małpka",
    "assets/monster/2_3.png","Pissed Of Dumpling",
    "assets/monster/1_4.png","Glimmer Alpha",
    "assets/monster/1_5.png","Glimmer Alpha Man",
    "assets/monster/1_4.png","Glimmer Alpha +1",
    "assets/monster/1_5.png","Glimmer Pasja Programowanie",
    "assets/monster/1_5.png","Glimmer Alpha++",
    "assets/monster/1_10B.jpg","Oktikk"],
  ];


  fillDungeon(dungeon){
    
    var monsterArray: Array<Enemy> = [];
    var amount = Math.round(Math.random()*12+10);

    for(let i=0;i<=amount;i++){
        let addLvl = Math.round((Math.random()*i/3)+i/3);

        if(i==amount){

          // BOSS

          monsterArray.push(new Enemy(
            this.monsters[dungeon-1][(this.monsters[dungeon-1].length/2-1)*2],
            this.getHitPoints(dungeon,i+1),
            this.monsters[dungeon-1][(this.monsters[dungeon-1].length/2-1)*2+1],
            this.getDamage(dungeon,i+1),
            dungeon*dungeon+addLvl,
            this.createLoot(dungeon,i+1,dungeon*dungeon+addLvl))
            );
        }else{
             
          // Enemys

          let r = Math.round(Math.random()*(this.monsters[dungeon-1].length/2-2));
               
        monsterArray.push(new Enemy(
          this.monsters[dungeon-1][r*2],
          this.getHitPoints(dungeon,i+1),
          this.monsters[dungeon-1][r*2+1],
          this.getDamage(dungeon,i+1),
          dungeon*dungeon+addLvl,
          this.createLoot(dungeon,i+1,dungeon*dungeon+addLvl))
          );
        }
        
    }

    return monsterArray;
  }


  reFillDungeon(dungeon){

    this.dungeons[dungeon].monsters = this.fillDungeon(dungeon+1);

    this.dungeons[dungeon].amount = this.dungeons[dungeon].monsters.length;

  }

}
