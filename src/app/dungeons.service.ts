import { Injectable } from '@angular/core';
import { Dungeon } from './dungeons/models/dungeon.model';
import { Enemy } from './dungeons/models/enemy.model';
import { MoneyBag } from './dungeons/models/moneyBag.model';
import { Weapon } from './dungeons/models/items/weapon.model';
import { Armor } from './dungeons/models/items/armor.model';
import { ImagesService } from './images.service';
import { Necklace } from './dungeons/models/items/necklace.model';
import { Ring } from './dungeons/models/items/ring.model';
import { Crystal } from './dungeons/models/items/crystal.model';

@Injectable({
  providedIn: 'root'
})
export class DungeonsService {

  dungeons: Array<Dungeon> = [];
  elites: Array<Dungeon> = [];
  chance: number = 1;


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
      this.dungeons.push(
        new Dungeon("assets/elite/cyclope.png",[new Enemy("assets/elite/cyclope.png",
        3451,
        "Cyclope",
        this.getDamage(2,9),
        10,
        this.createLoot(2,14,12,true))],0,true,1), 
      );
      this.dungeons.push(
       new Dungeon("assets/elite/giant_icon.png",[new Enemy("assets/elite/giant.png",
       11834,
       "Giant",
       this.getDamage(3,19),
       18,
       this.createLoot(3,21,25,true))],0,false,1), 
     );
     this.dungeons.push(
      new Dungeon("assets/elite/giant2_icon.png",[new Enemy("assets/elite/giant2.png",
      26834,
      "Giant",
      this.getDamage(4,21),
      25,
      this.createLoot(4,21,34,true))],0,false,1), 
    );
    this.dungeons.push(
      new Dungeon("assets/elite/cerberus_icon.png",[new Enemy("assets/elite/cerberus.png",
      33834,
      "Cerberus",
      this.getDamage(5,17),
      29,
      this.createLoot(5,11,39,true))],0,false,1), 
    );
    this.dungeons.push(
      new Dungeon("assets/elite/snake_icon.png",[new Enemy("assets/elite/snake.png",
      49834,
      "Severus Snake",
      this.getDamage(6,11),
      33,
      this.createLoot(6,13,44,true))],0,false,1), 
    );
    this.dungeons.push(
      new Dungeon("assets/elite/dragon_icon.png",[new Enemy("assets/elite/dragon.png",
      68834,
      "Dragonito Reclito",
      this.getDamage(6,23),
      41,
      this.createLoot(7,19,56,true))],0,false,1), 
    );

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


 createLoot(dungeon: number, subdungeon: number, level: number, elite: boolean = false){


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
    
    elite?this.chance=3:this.chance=1;

    if(itemChance<0.29*this.chance){
    loot.push(this.itemDrop(itemChance,dungeon,subdungeon,level));
    }

    this.chance=1; 

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

  if(IC>0.288*this.chance){
    item = new Crystal("artefact","Sonic's Crystal","assets/crystal/artefact_speed.png","#00E81","none",Math.round(lvl*lvl*0.6),'speed',Math.round(lvl/2),Math.random()*30-15,"artefact");
  }
  else if(IC>0.286*this.chance){
    item = new Crystal("artefact","Rain of Experience","assets/crystal/artefact_exp.png","#00E82","none",Math.round(lvl*lvl*0.6),'exp',Math.round((Math.random()*40+40))/100,Math.random()*30-15,"artefact");
  }
  else if(IC>0.284*this.chance){
    item = new Crystal("artefact","Crystal of Destruction","assets/crystal/artefact_dmg.png","#00E83","none",Math.round(lvl*lvl*0.6),'dmg',Math.round(Math.random()*20+25)/100,Math.random()*30-15,"artefact");
  }
  else if(IC>0.282*this.chance){
    item = new Crystal("artefact","Life's Crystal","assets/crystal/artefact_hp.png","#00E84","none",Math.round(lvl*lvl*0.6),'hp',Math.round((Math.random()*20+25))/100,Math.random()*30-15,"artefact");
  }
  else if(IC>0.278*this.chance){
    item = new Crystal("legend","Velocity Crystal","assets/crystal/legend_speed.png","#00E61","none",Math.round(lvl*lvl*0.4),'speed',Math.round(lvl/2.6),Math.random()*30-15,"legend");
  }
  else if(IC>0.274*this.chance){
    item = new Crystal("legend","Experience Multiplier","assets/crystal/legend_exp.png","#00E62","none",Math.round(lvl*lvl*0.4),'exp',Math.round((Math.random()*30+20))/100,Math.random()*30-15,"legend");
  }
  else if(IC>0.27*this.chance){
    item = new Crystal("legend","Power Crystal","assets/crystal/legend_dmg.png","#00E63","none",Math.round(lvl*lvl*0.4),'dmg',Math.round((Math.random()*15+15))/100,Math.random()*30-15,"legend");
  }
  else if(IC>0.266*this.chance){
    item = new Crystal("legend","Health Stream","assets/crystal/legend_hp.png","#00E64","none",Math.round(lvl*lvl*0.4),'hp',Math.round((Math.random()*15+15))/100,Math.random()*30-15,"legend");
  }
  else if(IC>0.259*this.chance){
    item = new Crystal("normal","Speed Gem","assets/crystal/normal_speed.png","#00E11","none",Math.round(lvl*lvl*0.2),'speed',Math.round(lvl/3),Math.random()*30-15,"normal");
  }
  else if(IC>0.252*this.chance){
    item = new Crystal("normal","Crystal Of Experience","assets/crystal/normal_exp.png","#00E12","none",Math.round(lvl*lvl*0.2),'exp',Math.round(Math.random()*20+5)/100,Math.random()*30-15,"normal");
  }
  else if(IC>0.245*this.chance){
    item = new Crystal("normal","Damage Crystal","assets/crystal/normal_dmg.png","#00E13","none",Math.round(lvl*lvl*0.2),'dmg',Math.round((Math.random()*10+8))/100,Math.random()*30-15,"normal");
  }
  else if(IC>0.238*this.chance){
    item = new Crystal("normal","Endurance Gem","assets/crystal/normal_hp.png","#00E14","none",Math.round(lvl*lvl*0.2),'hp',Math.round((Math.random()*10+8))/100,Math.random()*30-15,"normal");
  }
  else if(IC>0.14*this.chance){
  item = new Weapon("normal","A Fricking Sword","assets/weapon/"+w+"1.png","#00A11","none",Math.round(lvl*lvl*0.4),(Math.round(lvl*12)/10)+r,(Math.round(lvl*12)/10)+r+Math.round(lvl/4.5),100,Math.random()*30-15,"normal");
  }
  else if(IC>0.09*this.chance){
    item = new Armor("normal","Shield Yourself","assets/armor/"+a+"1.png","#00B12","none",Math.round(lvl*lvl*0.4),Math.round(lvl*lvl/2)+r+30,5+Math.round(Math.random()*5),100,Math.random()*30-15,"normal");
  }
  else if(IC>0.07*this.chance){
  item = new Weapon("legend","Holy Sword","assets/weapon/"+w+"2.png","#00A42","fire",Math.round(lvl*lvl*0.7)+40,(Math.round(lvl*14)/10)+r,(Math.round(lvl*14)/10)+r+Math.round(lvl/3),100,Math.random()*30-15,"legend");
  }
  else if(IC>0.05*this.chance){
    item = new Armor("legend","Holy Armor","assets/armor/"+a+"2.png","#00B43","none",Math.round(lvl*lvl*0.7),Math.round(lvl*lvl/1.4)+r+50,10+Math.round(Math.random()*10),100,Math.random()*30-15,"legend");
  }
  else if(IC>0.045*this.chance){
    item = new Weapon("artefact","Lucky Needle","assets/weapon/"+w+"3.png","#00A02","darkness",Math.round(lvl*lvl),(Math.round(lvl*16)/10)+r,(Math.round(lvl*16)/10)+r+Math.round(lvl/2.5)+lvl,100,Math.random()*30-15,"artefact");
  }
  else if(IC>0.04*this.chance){
    item = new Armor("artefact","Foreknowing Armor AI","assets/armor/"+a+"3.png","#00B01","none",Math.round(lvl*lvl),Math.round(lvl*lvl)+r+70,10+Math.round(Math.random()*20),100,Math.random()*30-15,"artefact");
  }
  else if(IC>0.027*this.chance){
    item = new Necklace("normal","Necklace of Wisdom","assets/necklace/1_1.png","#00C01","none",Math.round(lvl*lvl),lvl*4,Math.round(Math.random()*8+2)/100,Math.random()*30-15,"normal");
  }
  else if(IC>0.014*this.chance){
    item = new Ring("normal","Ring of Wisdom","assets/ring/1_1.png","#00D01","none",Math.round(lvl*lvl),lvl*4,Math.round(Math.random()*35+25)/100,Math.random()*30-15,"normal");
  }
  else if(IC>0.009*this.chance){
    item = new Necklace("legend","Necklace on Fire","assets/necklace/1_2.png","#00C02","fire",Math.round(lvl*lvl*1.2),lvl*6,Math.round(Math.random()*8+8)/100,Math.random()*30-15,"legend");
  }
  else if(IC>0.004*this.chance){
    item = new Ring("legend","Ring of Darkness","assets/ring/1_2.png","#00D02","darkness",Math.round(lvl*lvl*1.2),lvl*6,Math.round(Math.random()*50+50)/100,Math.random()*30-15,"legend");
  }
  else if(IC>0.002*this.chance){
    item = new Necklace("artefact","Necklace 1/500","assets/necklace/1_2.png","#00C03","fire",Math.round(lvl*lvl*1.3),lvl*9,Math.round(Math.random()*10+10)/100,Math.random()*30-15,"artefact");
  }
  else if(IC<=0.002*this.chance){
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

  reFillElite(elite){

    switch(elite){
      case 0:
     this.dungeons[elite+12].monsters =[new Enemy("assets/elite/cyclope.png",
     3451,
     "Cyclope",
     this.getDamage(2,9),
     10,
     this.createLoot(2,14,12,true))];
     break;
     case 1:
     this.dungeons[elite+12].monsters =[new Enemy("assets/elite/giant.png",
     11834,
     "Giant",
     this.getDamage(3,21),
     19,
     this.createLoot(3,21,25,true))];
     break;
     case 2:
      this.dungeons[elite+12].monsters = [new Enemy("assets/elite/giant2.png",
        29834,
        "Giant",
        this.getDamage(4,18),
        25,
        this.createLoot(4,21,25,true))];
     break;  
     case 3:
     this.dungeons[elite+12].monsters = [new Enemy("assets/elite/cerberus.png",
      39834,
      "Cerberus",
      this.getDamage(5,7),
      29,
      this.createLoot(5,11,25,true))];
    break;
    case 4:
    this.dungeons[elite+12].monsters = [new Enemy("assets/elite/snake.png",
      53834,
      "Severus Snake",
      this.getDamage(5,21),
      33,
      this.createLoot(6,13,25,true))];
    break;
    case 5:
    this.dungeons[elite+12].monsters = [new Enemy("assets/elite/dragon.png",
      68834,
      "Dragonito Reclito",
      this.getDamage(6,19),
      41,
      this.createLoot(7,19,25,true))];
    break;

    }

    if(this.dungeons[elite+13]){
      this.dungeons[elite+13].open = true;
    }

  }

}
