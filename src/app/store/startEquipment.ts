import { Armor } from "../dungeons/models/items/armor.model";
import { Weapon } from "../dungeons/models/items/weapon.model";
import { Necklace } from "../dungeons/models/items/necklace.model";
import { Ring } from "../dungeons/models/items/ring.model";


export class Starter {

  getBlankWeapon(id):Weapon{
    return new Weapon(
      id,
      "normal",
      "Fist",
      "assets/weapon/fist.png",
      "#00A00",
      "none",
      0,
      1,
      2,
      100
    );
  }

  getBlankArmor(id):Armor{
    return new Armor(
      id,
      "normal",
      "none",
      "assets/armor/none.png",
      "#00B00",
      "none",
      0,
      0,
      0,
      100
    );
  }

  getBlankRing(id):Ring{
    return new Ring(
      id,
      "normal",
      "none",
      "assets/ring/none.png",
      "#00D00",
      "none",
      0,
      0,
      0,
      100
    );
  }
  getBlankNecklace(id):Necklace{
    return new Necklace(
      id,
      "normal",
      "none",
      "assets/necklace/none.png",
      "#00C00",
      "none",
      0,
      0,
      0,
      100
    );
  }

  getStartArmor(id) {
    return new Armor(
      id,
      "normal",
      "Shield Yourself",
      "assets/armor/1_1.png",
      "#00B12",
      "none",
      5,
      38,
      10,
      100
    );
  }

  getStartNecklace(id) {
    return new Necklace(
      id,
      "normal",
      "Necklace of Wisdom",
      "assets/necklace/1_1.png",
      "#00C01",
      "none",
      5,
      9,
      0.07
    );
  }

  getStartRing(id) {
    return new Ring(
      id,
      "normal",
      "Ring of Beginnings",
      "assets/ring/1_1.png",
      "#00C01",
      "none",
      5,
      12,
      0.32
    );
  }

  getStartWeapon(id) {
    return new Weapon(
      id,
      "normal",
      "A Fricking Sword",
      "assets/weapon/1_2.png",
      "#00A11",
      "none",
      5,
      3,
      4,
      100
    );
  }



}
