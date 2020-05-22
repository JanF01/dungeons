

export class Enemy {
    graphic: string ;
    hitPoints: number;
    health: number;
    name: string;
    damage: number;
    level: number;
    loot: Array<any>;

    constructor(src,hp,name,dmg,lvl,loot){
         this.graphic = src;
         this.hitPoints = hp;
         this.health = hp;
         this.name = name;
         this.damage = dmg;
         this.level = lvl;
         this.loot = loot;
    }
    
 
 }