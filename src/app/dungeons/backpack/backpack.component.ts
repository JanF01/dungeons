import { Component, OnInit, Input } from "@angular/core";
import { User } from "../models/user.model";
import { ImagesService } from "../../images.service";
import { Weapon } from "../models/items/weapon.model";
import { Armor } from "../models/items/armor.model";
import { Item } from "../models/item.model";
import { Necklace } from "../models/items/necklace.model";
import { Ring } from "../models/items/ring.model";
import { SocketService } from "src/app/socket.service";

@Component({
  selector: "app-backpack",
  templateUrl: "./backpack.component.html",
  styleUrls: ["./backpack.component.scss"],
})
export class BackpackComponent implements OnInit {
  @Input("user") player: User;
  arrayForItems: Array<number> = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
  ];
  arrayItemsPos = [];

  backpack = "backpack";

  appearMenu: boolean = false;

  menuOption: string;

  constructor(private images: ImagesService, private socket: SocketService) {
    for (let i = 0; i <= 35; i++) {
      this.arrayItemsPos.push({ x: 0, y: 0 });
    }
  }

  ngOnInit(): void {}

  backHome() {
    this.player.location = "home";

    setTimeout(() => {
      document.getElementById("cont").style.opacity = "1";
      let mBck = document.getElementsByClassName("mainBck") as HTMLCollectionOf<
        HTMLElement
      >;
      mBck[0].style.opacity = "0.8";

      let assets = document.getElementsByClassName("assets")[0];
      assets.innerHTML = "";
      assets.appendChild(this.images.gold);
      assets.append(this.player.gold.toString());
    }, 10);
  }

  showBackpack() {
    document.getElementById("backpack").style.opacity = "1";
  }

  checkGemArmor() {
    if (this.player.armor.gem != undefined) {
      let gem = this.player.armor.gem;
      if (gem.amp == "speed") {
        this.player.speed -= gem.power;
      } else if (gem.amp == "hp") {
        this.player.hitPoints = Math.round(
          this.player.hitPoints / (1 + gem.power)
        );
      }
    }
  }
  checkGemWeapon() {
    if (this.player.weapon.gem != undefined) {
      let gem = this.player.weapon.gem;
      if (gem.amp == "speed") {
        this.player.speed -= gem.power;
      }
    }
  }
  checkGemRest() {
    if (this.player.necklace.gem != undefined) {
      let gem = this.player.necklace.gem;
      if (gem.amp == "exp") {
        this.player.expMulti -= gem.power;
      }
    }
  }

  itemOnCheck: any;

  showMenu($event: MouseEvent, i, item) {
    $event.preventDefault();
    if (item != undefined && item.name != "none") {
      this.itemOnCheck = item;

      this.bubblePos.x = $event.clientX;
      this.bubblePos.y = $event.clientY;

      this.appearMenu = true;
      if (i == -1) {
        this.menuOption = "Take off";
      } else {
        this.menuOption = "Wear";
      }
      this.hideInfo();
    }
  }

  itemEvent(value) {
    console.log(value);
    if (value == "sell") {
      if (this.itemOnCheck.name != "none" && this.itemOnCheck.name != "Fist") {
        let i = this.player.items.indexOf(this.itemOnCheck);
        this.player.items.splice(i, 1);
        this.player.gold += this.itemOnCheck.cost;
      }
    } else if (value == "wear") {
      if (this.itemOnCheck != undefined) {
        if (this.itemOnCheck.damageLow != undefined) {
          this.changeItem(this.itemOnCheck, "weapon");
        } else if (this.itemOnCheck.defence != undefined) {
          this.changeItem(this.itemOnCheck, "armor");
        } else if (this.itemOnCheck.critical != undefined) {
          this.changeItem(this.itemOnCheck, "necklace");
        } else if (this.itemOnCheck.critM != undefined) {
          this.changeItem(this.itemOnCheck, "ring");
        }
      }
    } else if (value == "off") {
      if (this.itemOnCheck != undefined) {
        if (this.itemOnCheck.damageLow != undefined) {
          if (
            this.player.items.length < 27 &&
            this.player.weapon.name != "Fist"
          ) {
            this.player.items.push(this.player.weapon);
            this.checkGemWeapon();
            this.player.weapon = new Weapon(
              this.player.id,
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
        } else if (this.itemOnCheck.defence != undefined) {
          if (
            this.player.items.length < 27 &&
            this.player.armor.name != "none"
          ) {
            this.player.items.push(this.player.armor);
            this.checkGemArmor();
            this.player.armor = new Armor(
              this.player.id,
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
        } else if (this.itemOnCheck.critical != undefined) {
          if (
            this.player.items.length < 27 &&
            this.player.necklace.name != "none"
          ) {
            this.player.items.push(this.player.necklace);
            this.checkGemRest();
            this.player.necklace = new Necklace(
              this.player.id,
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
        } else if (this.itemOnCheck.critM != undefined) {
          if (
            this.player.items.length < 27 &&
            this.player.ring.name != "none"
          ) {
            this.player.items.push(this.player.ring);
            this.checkGemRest();
            this.player.ring = new Ring(
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
        }
      }
    }
    this.appearMenu = false;
    this.socket.updatePlayer(this.player);
  }

  itemForInfo: any;
  showInfoBubble = false;
  bubblePos = { x: 180, y: 180 };

  showInfo(item) {
    if (item != undefined && (this.itemOnCheck == item || !this.appearMenu)) {
      if (item.name != "none") {
        this.itemForInfo = item;
        this.showInfoBubble = true;
      }
    }
  }
  changePosition($event: MouseEvent) {
    if (!this.appearMenu) {
      if (!this.dragging) {
        this.bubblePos.x = $event.clientX;
        this.bubblePos.y = $event.clientY;
      } else {
        let pos = this.draggedItem.getBoundingClientRect();
        this.bubblePos.x = pos.x + window.innerWidth / 15;
        this.bubblePos.y = pos.y;
      }
    }
  }

  hideInfo() {
    this.showInfoBubble = false;
  }

  dragging: boolean = false;
  draggedItem: HTMLElement;

  grab(i) {
    let items = document.getElementsByClassName("spot") as HTMLCollectionOf<
      HTMLElement
    >;
    items[i].style.cursor = "grabbing";
    this.dragging = true;
    let pos = items[i].getBoundingClientRect();
    this.draggedItem = items[i];
    this.bubblePos.x = pos.x + window.innerWidth / 15;
    this.bubblePos.y = pos.y;
  }

  dropItem(i) {
    let items = document.getElementsByClassName("spot") as HTMLCollectionOf<
      HTMLElement
    >;

    var dropedPos = items[i].getBoundingClientRect();

    this.checkIfSold(this.player.items[i - 9], dropedPos, i - 9);

    if (this.player.items[i - 9] == undefined) {
      this.setDefault(i);
    } else if (this.player.items[i - 9].damageLow != undefined) {
      this.changeItems(this.player.items[i - 9], dropedPos, i, "weapon");
    } else if (this.player.items[i - 9].defence != undefined) {
      this.changeItems(this.player.items[i - 9], dropedPos, i, "armor");
    } else if (this.player.items[i - 9].critical != undefined) {
      this.changeItems(this.player.items[i - 9], dropedPos, i, "necklace");
    } else if (this.player.items[i - 9].critM != undefined) {
      this.changeItems(this.player.items[i - 9], dropedPos, i, "ring");
    } else {
      this.setDefault(i);
    }
  }

  checkIfSold(item, pos, i) {
    let box = document.getElementById("sell").getBoundingClientRect();
    let w = window.innerWidth;
    if (
      pos.x > box.x - w / 25 &&
      pos.x < box.x + w / 14 &&
      pos.y > box.y - w / 17 &&
      pos.y < box.y + w / 14
    ) {
      this.player.items.splice(i, 1);
      this.player.gold += item.cost;
      this.hideInfo();
      this.socket.updatePlayer(this.player);
    }
  }

  toBackpack(item, what) {
    if (what.name != "Fist" && what.name != "none")
      this.player.items[this.player.items.indexOf(item)] = what;
    else {
      this.player.items.splice(this.player.items.indexOf(item), 1);
      what = undefined;
    }
    this.socket.updatePlayer(this.player);
  }

  changeItem(item, type) {
    if (type == "weapon") {
      this.checkGemWeapon();

      this.toBackpack(item, this.player.weapon);
      this.player.weapon = item;

      if (this.player.weapon.gem != undefined) {
        let gem = this.player.weapon.gem;
        if (gem.amp == "speed") {
          this.player.speed += gem.power;
        }
      }
    } else if (type == "armor") {
      this.checkGemArmor();

      this.toBackpack(item, this.player.armor);
      this.player.armor = item;

      if (this.player.armor.gem != undefined) {
        let gem = this.player.armor.gem;
        if (gem.amp == "speed") {
          this.player.speed += gem.power;
        } else if (gem.amp == "hp") {
          this.player.hitPoints = Math.round(
            this.player.hitPoints * (1 + gem.power)
          );
        }
      }
    } else if (type == "necklace") {
      this.checkGemRest();

      this.player.stamina -= this.player.necklace.stamina;
      this.player.staminaLeft -= this.player.necklace.stamina;

      this.toBackpack(item, this.player.necklace);
      this.player.necklace = item;

      this.player.stamina += item.stamina;
      this.player.staminaLeft += item.stamina;

      if (this.player.necklace.gem != undefined) {
        let gem = this.player.necklace.gem;
        if (gem.amp == "exp") {
          this.player.expMulti += gem.power;
        }
      }
    } else if (type == "ring") {
      this.checkGemRest();

      this.player.stamina -= this.player.ring.stamina;
      this.player.staminaLeft -= this.player.ring.stamina;

      this.toBackpack(item, this.player.ring);
      this.player.ring = item;

      this.player.stamina += item.stamina;
      this.player.staminaLeft += item.stamina;

      if (this.player.ring.gem != undefined) {
        let gem = this.player.ring.gem;
        if (gem.amp == "exp") {
          this.player.expMulti += gem.power;
        }
      }
    }
    this.socket.updatePlayer(this.player);
  }

  changeItems(item, pos, i, type) {
    let box = document.getElementById(type).getBoundingClientRect();
    let w = window.innerWidth;

    if (
      pos.x > box.x - w / 16 &&
      pos.x < box.x + w / 15 &&
      pos.y > box.y - w / 17 &&
      pos.y < box.y + w / 14
    ) {
      this.changeItem(item, type);

      this.setDefault(i);
    } else {
      this.setDefault(i);
    }
  }
  setDefault(i) {
    let items = document.getElementsByClassName("spot") as HTMLCollectionOf<
      HTMLElement
    >;
    for (let i = 0; i < items.length; i++) {
      items[i].style.cursor = "grab";
    }
    this.arrayItemsPos[i] = { x: 0, y: 0 };
    this.dragging = false;
  }
}
