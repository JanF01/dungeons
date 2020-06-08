import { Component, OnInit, Input } from "@angular/core";
import { User } from "../../models/user.model";
import { ImagesService } from "src/app/images.service";
import { Item } from "../../models/item.model";
import { Armor } from "../../models/items/armor.model";
import { Weapon } from "../../models/items/weapon.model";

@Component({
  selector: "app-armory",
  templateUrl: "./armory.component.html",
  styleUrls: ["./armory.component.scss"],
})
export class ArmoryComponent implements OnInit {
  @Input("user") player: User;
  village = "shop";

  weaponPos = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];
  armorPos = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];

  showAlert: boolean = false;
  alertInput: string = "";

  constructor(private images: ImagesService) {}

  ngOnInit(): void {}

  newAsortament() {
    let r = Math.round(
      (Math.random() * this.player.level) / 2 + 1 + this.player.level / 2
    );

    this.player.armorsInShop[0] = new Armor(
      "normal",
      "Shield Yourself",
      "assets/armor/1_1.png",
      "#00B12",
      "none",
      Math.round(this.player.level * this.player.level + 20),
      Math.round((this.player.level * this.player.level) / 2) + r + 30,
      5 + Math.round(Math.random() * 5),
      100,
      Math.random() * 30 - 15,
      "normal"
    );
    this.player.armorsInShop[1] = new Armor(
      "normal",
      "Shield Yourself",
      "assets/armor/1_2.png",
      "#00B13",
      "none",
      Math.round(this.player.level * this.player.level * 1.2 + 20),
      Math.round((this.player.level * this.player.level) / 1.8) + r + 30,
      5 + Math.round(Math.random() * 5 + 2),
      100,
      Math.random() * 30 - 15,
      "normal"
    );
    this.player.armorsInShop[2] = new Armor(
      "normal",
      "Shield Yourself",
      "assets/armor/1_3.png",
      "#00B13",
      "none",
      Math.round(this.player.level * this.player.level * 1.5 + 20),
      Math.round((this.player.level * this.player.level) / 1.7) + r + 30,
      5 + Math.round(Math.random() * 5 + 4),
      100,
      Math.random() * 30 - 15,
      "normal"
    );

    this.player.weaponsInShop[0] = new Weapon(
      "normal",
      "A Fricking Sword",
      "assets/weapon/1_2.png",
      "#00A11",
      "none",
      Math.round(this.player.level * this.player.level + 20),
      Math.round(this.player.level * 8) / 10 + r,
      Math.round(this.player.level * 8) / 10 +
        r +
        Math.round(this.player.level / 4.5),
      100,
      Math.random() * 30 - 15,
      "normal"
    );
    this.player.weaponsInShop[1] = new Weapon(
      "normal",
      "A Fricking Sword",
      "assets/weapon/1_1.png",
      "#00A11",
      "none",
      Math.round(this.player.level * this.player.level * 1.2 + 30),
      Math.round(this.player.level * 10) / 10 + r,
      Math.round(this.player.level * 10) / 10 +
        r +
        Math.round(this.player.level / 4.5),
      100,
      Math.random() * 30 - 15,
      "normal"
    );
    this.player.weaponsInShop[2] = new Weapon(
      "normal",
      "A Fricking Sword",
      "assets/weapon/1_1.png",
      "#00A11",
      "none",
      Math.round(this.player.level * this.player.level * 1.4 + 40),
      Math.round(this.player.level * 12) / 10 + r,
      Math.round(this.player.level * 12) / 10 +
        r +
        Math.round(this.player.level / 4.5),
      100,
      Math.random() * 30 - 15,
      "normal"
    );
  }

  grab(i) {
    let items = document.getElementsByClassName("item") as HTMLCollectionOf<
      HTMLElement
    >;
    items[i].style.cursor = "grabbing";
  }

  itemForInfo: any;
  showInfoBubble = false;
  bubblePos = { x: 180, y: 180 };

  showInfo(item) {
    this.itemForInfo = item;
    this.showInfoBubble = true;
  }
  changePosition($event: MouseEvent) {
    this.bubblePos.x = $event.clientX;
    this.bubblePos.y = $event.clientY;
  }

  hideInfo() {
    this.showInfoBubble = false;
  }

  buyItem(item, n, div, t) {
    if (this.checkIfBought(item, div, t, n)) {
      if (this.player.items.length < 27) {
        if (this.player.gold >= item.cost) {
          let itemCopy: any = {};
          Object.assign(itemCopy, item);

          itemCopy.cost = Math.round(item.cost * 0.7);
          this.player.items.push(itemCopy);
          this.player.itemsOnHold.push(itemCopy);
          this.player.gold -= item.cost;

          t[n] = { x: 0, y: 0 };
        } else {
          this.alertOut("Not enough gold");
          t[n] = { x: 0, y: 0 };
        }
      } else {
        this.alertOut("You don't have space in the backpack");
        t[n] = { x: 0, y: 0 };
      }
    } else {
      t[n] = { x: 0, y: 0 };
    }
  }

  checkIfBought(item, div, t, n) {
    var spot = document.getElementById(div).getBoundingClientRect();

    let backpack = document.getElementsByClassName(
      "backpack"
    ) as HTMLCollectionOf<HTMLElement>;
    let width = window.innerWidth;
    var rect = backpack[0].getBoundingClientRect();
    if (
      spot.x <= rect.x + width * 0.8 &&
      spot.x > rect.x + width / 16 &&
      spot.y >= rect.y - width / 25 &&
      spot.y < rect.y + width / 35
    ) {
      return true;
    } else {
      t[n] = { x: 0, y: 0 };
      return false;
    }
  }

  alertOut(input) {
    this.alertInput = input;
    this.showAlert = true;
  }
  alertOff() {
    this.showAlert = false;
  }
}
