import { Armor } from "../dungeons/models/items/armor.model";
import { Weapon } from "../dungeons/models/items/weapon.model";

export class ItemFactory {
  armoryWeapon(id, n, lvl, mcost, mdamage, addcost, r): Weapon {
    return new Weapon(
      id,
      "normal",
      "A Fricking Sword",
      "assets/weapon/1_" + n + ".png",
      "#00A11",
      "none",
      Math.round(lvl * lvl * mcost + addcost),
      Math.round(lvl * mdamage) / 10 + r,
      Math.round(lvl * mdamage) / 10 + r + Math.round(lvl / 4.5),
      100,
      Math.random() * 30 - 15,
      "normal"
    );
  }
  armoryArmor(id, n, lvl, mcost, lessendefence, chance, r): Armor {
    return new Armor(
      id,
      "normal",
      "Shield Yourself",
      "assets/armor/1_" + n + ".png",
      "#00B12",
      "none",
      Math.round(lvl * lvl * mcost + 20),
      Math.round((lvl * lvl) / lessendefence) + r + 30,
      5 + Math.round(Math.random() * 5 + chance),
      100,
      Math.random() * 30 - 15,
      "normal"
    );
  }
}
