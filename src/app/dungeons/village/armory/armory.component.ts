import { Component, OnInit, Input } from "@angular/core";
import { User } from "../../models/user.model";
import { ImagesService } from "src/app/images.service";
import { Item } from "../../models/item.model";
import { Armor } from "../../models/items/armor.model";
import { Weapon } from "../../models/items/weapon.model";
import { SocketService } from "src/app/socket.service";
import { ItemFactory } from 'src/app/store/itemFactory';

@Component({
  selector: "app-armory",
  templateUrl: "./armory.component.html",
  styleUrls: ["./armory.component.scss"],
})
export class ArmoryComponent implements OnInit {
  @Input("user") player: User;

  showAlert: boolean = false;

  alertInput: string = "";
  village: string = "shop";

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

  constructor(private images: ImagesService, private socket: SocketService, private factory: ItemFactory) {}

  ngOnInit(): void {}

  newAsortament(): void {
    
    let r = Math.round(
      (Math.random() * this.player.level) / 2 + 1 + this.player.level / 2
    );

    this.player.armorsInShop[0] = this.factory.armoryArmor(this.player.id,1,this.player.level,1,2,2,r);
    this.player.armorsInShop[1] = this.factory.armoryArmor(this.player.id,2,this.player.level,1.2,1.8,2,r);
    this.player.armorsInShop[2] = this.factory.armoryArmor(this.player.id,3,this.player.level,1.5,1.7,4,r);

    this.player.weaponsInShop[0] = this.factory.armoryWeapon(this.player.id,2,this.player.level,1,8,20,r);
    this.player.weaponsInShop[1] = this.factory.armoryWeapon(this.player.id,1,this.player.level,1.2,10,30,r);
    this.player.weaponsInShop[2] = this.factory.armoryWeapon(this.player.id,1,this.player.level,1.4,12,40,r);

  }

  grab(i): void {
    let items = document.getElementsByClassName("item") as HTMLCollectionOf<
      HTMLElement
    >;
    items[i].style.cursor = "grabbing";
  }

  itemForInfo: any;
  showInfoBubble = false;
  bubblePos = { x: 180, y: 180 };

  showInfo(item): void {
    this.itemForInfo = item;
    this.showInfoBubble = true;
  }
  changePosition($event: MouseEvent): void {
    this.bubblePos.x = $event.clientX;
    this.bubblePos.y = $event.clientY;
  }

  hideInfo(): void {
    this.showInfoBubble = false;
  }

  buyItem(item, n, div, t): void {
    if (this.checkIfBought(div, t, n)) {
      if (this.player.items.length < 27) {
        if (this.player.gold >= item.cost) {
          let itemCopy: any = {};
          Object.assign(itemCopy, item);

          itemCopy.cost = Math.round(item.cost * 0.7);
          this.player.items.push(itemCopy);
          this.player.itemsOnHold.push(itemCopy);
          this.player.gold -= item.cost;

          this.socket.updatePlayer(this.player);

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

  checkIfBought(div, t, n): boolean {
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

  alertOut(input): void {
    this.alertInput = input;
    this.showAlert = true;
  }
  alertOff(): void {
    this.showAlert = false;
  }
}
