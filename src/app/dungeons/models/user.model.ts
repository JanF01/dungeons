import { Weapon } from "./items/weapon.model";
import { Armor } from "./items/armor.model";
import { Item } from "./item.model";
import { Necklace } from "./items/necklace.model";
import { Ring } from "./items/ring.model";

export class User {
  name: string;
  level: number;
  exp: number;
  expMulti: number;
  nextExp: number;
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
  necklace: Necklace;
  ring: Ring;
  potions: Array<any>;
  items: Array<any>;
  itemsOnHold: Array<any>;
  loot: Array<Item>;
  weaponsInShop: Array<Weapon>;
  armorsInShop: Array<Armor>;
  missionOn: Array<boolean>;
  missionStart: number;
  missionTime: number;
  missionNumber: number;
  maxMissions: number;
  missions: number;
}
