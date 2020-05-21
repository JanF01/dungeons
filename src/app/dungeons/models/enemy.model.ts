

export class Enemy {
    hitPoints: number;
    health: number;
    name: string;
    damage: number;
    level: number;
    loot: Array<any>;

    constructor(hp,hpleft,name,dmg,lvl,loot){
         this.hitPoints = hp;
         this.health = hpleft;
         this.name = name;
         this.damage = dmg;
         this.level = lvl;
         this.loot = loot;
    }
    
 
 }