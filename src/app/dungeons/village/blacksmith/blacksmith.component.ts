import { Component, OnInit, Input } from "@angular/core";
import { User } from "../../models/user.model";
import { ImagesService } from "src/app/images.service";
import { Item } from "../../models/item.model";
import { Crystal } from "../../models/items/crystal.model";
import { SocketService } from "src/app/socket.service";

@Component({
  selector: "app-blacksmith",
  templateUrl: "./blacksmith.component.html",
  styleUrls: ["./blacksmith.component.scss"],
})
export class BlacksmithComponent implements OnInit {
  @Input("user") player: User;

  village: string = "shop";

  dragging: boolean = false;
  showInfoBubble: boolean = false;

  arrayForItems: Array<number> = [];
  arrayItemsPos: Array<Object> = [];

  upgradedItemPos = { x: 0, y: 0 };
  gemForUpgrade: Crystal;
  itemForUpgrade: any;
  upgradedItem: any = { sum: 2 };
  itemForInfo: any;
  draggedItem: HTMLElement;

  bubblePos: any = { x: 180, y: 180 };

  constructor(private images: ImagesService, private socket: SocketService) {
    this.arrayForItems = [...new Array(27)].map((a, i) => {
      return i;
    });
  }

  ngOnInit(): void {}

  showInfo(item): void {
    if (item != undefined) {
      this.itemForInfo = item;
      this.showInfoBubble = true;
    }
  }
  changePosition($event: MouseEvent): void {
    if (!this.dragging) {
      this.bubblePos.x = $event.clientX;
      this.bubblePos.y = $event.clientY;
    } else {
      let pos = this.draggedItem.getBoundingClientRect();
      this.bubblePos.x = pos.x + window.innerWidth / 15;
      this.bubblePos.y = pos.y;
    }
  }

  hideInfo(): void {
    this.showInfoBubble = false;
  }

  grab(i): void {
    let items = document.getElementsByClassName("spot") as HTMLCollectionOf<
      HTMLElement
    >;
    this.dragging = true;
    this.draggedItem = items[i];

    items[i].style.cursor = "grabbing";
    let pos = items[i].getBoundingClientRect();
    this.bubblePos.x = pos.x + window.innerWidth / 15;
    this.bubblePos.y = pos.y;
  }
  grabUpgraded(): void {
    let item = document.getElementById("end");
    item.style.cursor = "grabbing";
    this.dragging = true;
    this.draggedItem = item;
    let pos = item.getBoundingClientRect();
    this.bubblePos.x = pos.x + window.innerWidth / 15;
    this.bubblePos.y = pos.y;
  }

  getClass(item): string {
    return item != undefined ? item.type : "normal";
  }

  dropToBackpack(): void {
    let upgraded = document.getElementById("end").getBoundingClientRect();

    let backpack = document.getElementsByClassName(
      "backpack"
    ) as HTMLCollectionOf<HTMLElement>;

    let pos = backpack[0].getBoundingClientRect();

    let w = window.innerWidth;
    let h = window.innerHeight;

    if (
      upgraded.x > pos.x - w / 14 &&
      upgraded.x < pos.x + w / 1.4 &&
      upgraded.y > pos.y - w / 25 &&
      upgraded.y < pos.y + h / 2.7
    ) {
      if (this.upgradedItem.sum != 2) {
        this.player.items.splice(
          this.player.items.indexOf(this.gemForUpgrade),
          1
        );
        this.player.items[
          this.player.items.indexOf(this.itemForUpgrade)
        ] = this.upgradedItem;
        this.upgradedItem = { sum: 2 };
        this.itemForUpgrade = undefined;
        this.gemForUpgrade = undefined;
        this.hideInfo();
        this.bubblePos = { x: 0, y: 0 };
        this.dragging = false;
        this.socket.updatePlayer(this.player);
      }
    } else {
      this.upgradedItemPos = { x: 0, y: 0 };
    }
  }

  dropItem(i): void {
    let items = document.getElementsByClassName("spot") as HTMLCollectionOf<
      HTMLElement
    >;

    var dropedPos = items[i].getBoundingClientRect();

    if (this.checkIfAnvil(dropedPos)) {
      if (this.player.items[i].amp != undefined) {
        this.gemForUpgrade = this.player.items[i];
      } else {
        this.itemForUpgrade = this.player.items[i];
      }
    }

    this.createUpgradedItem();

    this.setDefault(i);
  }

  checkIfAnvil(dropedPos): boolean {
    var anvil = document.getElementsByClassName("anvil") as HTMLCollectionOf<
      HTMLElement
    >;
    let anvilPos = anvil[0].getBoundingClientRect();
    let w = window.innerWidth;

    if (
      dropedPos.x > anvilPos.x - w / 14 &&
      dropedPos.x < anvilPos.x + w / 2 &&
      dropedPos.y > anvilPos.y - w / 15 &&
      dropedPos.y < anvilPos.y + w / 14
    ) {
      return true;
    } else {
      return false;
    }
  }

  createUpgradedItem(): void {
    if (this.itemForUpgrade != undefined && this.gemForUpgrade != undefined) {
      if (
        (this.itemForUpgrade.damageLow != undefined &&
          (this.gemForUpgrade.amp == "dmg" ||
            this.gemForUpgrade.amp == "speed")) ||
        (this.itemForUpgrade.defence != undefined &&
          (this.gemForUpgrade.amp == "hp" ||
            this.gemForUpgrade.amp == "speed")) ||
        ((this.itemForUpgrade.critical != undefined ||
          this.itemForUpgrade.critM != undefined) &&
          this.gemForUpgrade.amp == "exp")
      ) {
        this.upgradedItem = { sum: 2 };
        Object.assign(this.upgradedItem, this.itemForUpgrade);
        this.upgradedItem.gem = this.gemForUpgrade;
        this.upgradedItem.sum = 3;
        this.changeGem();
      } else {
        this.upgradedItem = { sum: 2 };
      }
    }
  }

  setDefault(i): void {
    let items = document.getElementsByClassName("spot") as HTMLCollectionOf<
      HTMLElement
    >;
    for (let i = 0; i < items.length; i++) {
      items[i].style.cursor = "grab";
    }
    this.arrayItemsPos[i] = { x: 0, y: 0 };
    this.dragging = false;
  }

  changeGem(): void {
    this.upgradedItem.gem = this.gemForUpgrade;

    if (this.gemForUpgrade.amp == "dmg") {
      this.upgradedItem.damageLow *= 1 + this.gemForUpgrade.power;
      this.upgradedItem.damageHigh *= 1 + this.gemForUpgrade.power;
      this.upgradedItem.damageLow =
        Math.round(this.upgradedItem.damageLow * 10) / 10;
      this.upgradedItem.damageHigh =
        Math.round(this.upgradedItem.damageHigh * 10) / 10;
    }
  }
}
