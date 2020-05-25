import { Weapon } from "./items/weapon.model";
import { Armor } from "./items/armor.model";

export class User {
   name: string;
   level: number;
   exp: number;
   gold: number;
   basePoints: Array<number>;
   strength: number;
   damage: number;
   hitPoints: number;
   health: number;
   stamina: number;
   staminaLeft: number;
   speed: number;
   speedBuildUp: number;
   luck: number;
   location: string;
   dungeon: number;
   subdungeon: Array<number>;
   goldInSack: number;
   graphic: string;
   weapon: Weapon;
   armor: Armor;
   necklace: string;
   ring: string;
   potions: Array<any>;
   items: Array<any>;


}