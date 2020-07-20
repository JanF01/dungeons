import { Component, OnInit, Input } from "@angular/core";
import { User } from "../models/user.model";
import { Potion } from "../models/potion.model";
import { ImagesService } from "../../images.service";
import { CdkDragEnd } from "@angular/cdk/drag-drop";
import { SocketService } from "src/app/socket.service";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"],
})
export class ShopComponent implements OnInit {
  @Input("user") player: User;


  alertInput: string = "";
  shop: string = "shop";

  showAlert: boolean = false;
  showInfoBubble:boolean = false;

  healthPrice: number = 10;
  staminaPrice: number = 10;
  speedPrice: number = 10;



  hp = new Potion("Health I", "none", "hp", 600, "HP Potion");
  sp = new Potion("Speed I", "none", "speed", 2, "Speed Potion");
  st = new Potion("Stamina I", "none", "stamina", 5, "Stamina Potion");

  potionPos = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];

  posspeed = { x: 0, y: 0 };
  posstamina = { x: 0, y: 0 };
  bubblePos = { x: 180, y: 180 };
  
  itemForInfo: any;


  constructor(private images: ImagesService, private socket: SocketService) {}

  ngOnInit(): void {}

  showCost(n): void {
    document.getElementById("cost" + n).style.opacity = "1";
  }
  hideCost(n): void {
    document.getElementById("cost" + n).style.opacity = "0";
  }

  backHome(): void {
    this.player.location = "home";

    setTimeout(() => {
      document.getElementById("cont").style.opacity = "1";
      let mBck = document.getElementsByClassName("mainBck") as HTMLCollectionOf<HTMLElement>;
      mBck[0].style.opacity = "0.8";

      let assets = document.getElementsByClassName("assets")[0];
      assets.innerHTML = "";
      assets.appendChild(this.images.gold);
      assets.append(this.player.gold.toString());
    }, 10);
  }

  resetPotionPos(n): void {
    this.potionPos[n] = { x: 0, y: 0 };
  }

  grabPotion(n): void {
    let potions = document.getElementsByClassName("item") as HTMLCollectionOf<HTMLElement>;
    potions[n].style.cursor = "grab";
  }

  checkIfBought(p, n): boolean {
    var potion = document.getElementById(p).getBoundingClientRect();

    let backpack = document.getElementsByClassName(
      "backpack"
    ) as HTMLCollectionOf<HTMLElement>;
    let width = window.innerWidth;
    var rect = backpack[0].getBoundingClientRect();
    if (
      potion.x <= rect.x + width * 0.8 &&
      potion.x > rect.x + width / 16 &&
      potion.y >= rect.y - width / 25 &&
      potion.y < rect.y + width / 35
    ) {
      this.socket.updatePlayer(this.player);
      return true;
    } else {
      this.resetPotionPos(n);
      return false;
    }
  }


  buyHpPotion(size, $event: CdkDragEnd): void {
    this.grabPotion(0);

    if (this.checkIfBought("hp", 0)) {
      if (this.player.gold >= this.healthPrice) {
        if (this.player.potions.length < 9){

          this.player.gold -= this.healthPrice;
          let potion = this.images.newHpPotion() as HTMLImageElement;
          potion.classList.toggle("potionInBackpack");

          this.player.potions.push(
            new Potion("Health I", potion, "hp", size, "HP Potion")
          );

        } else {
          this.alertOut("No space for potions");
        }
      } else {
        this.alertOut("Not enough gold");
      }
      this.resetPotionPos(0);
    }
  }


  buyStaminaPotion(size, $event: CdkDragEnd): void {
    this.grabPotion(1);

    if (this.checkIfBought("stamina", 1)) {
      if (this.player.gold >= 10) {
        if (this.player.potions.length < 9) {

          this.player.gold -= 10;
          let potion = this.images.newStaminaPotion() as HTMLImageElement;
          potion.classList.toggle("potionInBackpack");

          this.player.potions.push(
            new Potion("Stamina I", potion, "stamina", size, "Stamina Potion")
          );

        } else {
          this.alertOut("No space for potions");
        }
      } else {
        this.alertOut("Not enough gold");
      }
      this.resetPotionPos(1);
    }
  }
  buySpeedPotion(size, $event: CdkDragEnd): void {
    this.grabPotion(2);

    if (this.checkIfBought("speed", 2)) {
      if (this.player.gold >= this.speedPrice) {
        if (this.player.potions.length < 9) {

          this.player.gold -= this.speedPrice;
          let potion = this.images.newSpeedPotion() as HTMLImageElement;
          potion.classList.toggle("potionInBackpack");
          this.speedPrice += 2;

          this.player.potions.push(
            new Potion("Speed I", potion, "speed", size, "Speed Potion")
          );

        } else {
          this.alertOut("No space for potions");
        }
      } else {
        this.alertOut("Not enough gold");
      }
      this.resetPotionPos(2);
    }
  }

  showPotions(): void {
    let potions = document.getElementsByClassName("item") as HTMLCollectionOf<
      HTMLElement
    >;
    potions[0].insertBefore(this.images.hpPotion, potions[0].firstChild);
    potions[1].insertBefore(this.images.staminaPotion, potions[1].firstChild);
    potions[2].insertBefore(this.images.speedPotion, potions[2].firstChild);
    setTimeout(() => {
      document.getElementById("shop").style.opacity = "1";
    }, 40);
    this.healthPrice = 10 + this.player.level * 2;
    this.staminaPrice = 10 + this.player.level * 2;
    this.speedPrice = 10 + this.player.level * 2;
  }

  grab(i): void {
    let potions = document.getElementsByClassName("item") as HTMLCollectionOf<
      HTMLElement
    >;
    potions[i].style.cursor = "grabbing";
  }

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

  alertOut(input): void {
    this.alertInput = input;
    this.showAlert = true;
  }
  alertOff(): void {
    this.showAlert = false;
  }
}
