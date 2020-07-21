import { Component, OnInit, Input, ɵPlayer } from "@angular/core";
import { User } from "../models/user.model";
import { CdkDragEnd } from "@angular/cdk/drag-drop";
import { ImagesService } from "../../images.service";
import { UpdateService } from "src/app/update.service";
import { SocketService } from "src/app/socket.service";

@Component({
  selector: "app-character",
  templateUrl: "./character.component.html",
  styleUrls: ["./character.component.scss"],
})
export class CharacterComponent implements OnInit {
  @Input("user") player: User;

  strengthCost:number = 5;
  staminaCost:number = 5;
  hpCost:number = 5;
  speedCost:number = 5;
  luckCost:number = 5;
  potions = {
    hp: 0,
    stamina: 0,
    speed: 0,
  };
  weaponPos = { x: 0, y: 0 };
  armorPos = { x: 0, y: 0 };
  necklacePos = { x: 0, y: 0 };
  ringPos = { x: 0, y: 0 };

  updateDetails: any;

  constructor(private images: ImagesService, private socket: SocketService) {}

  countPotions(): void {
    for (let i = 0; i < this.player.potions.length; i++) {
      switch (this.player.potions[i].type) {
        case "hp":
          this.potions.hp++;
          break;
        case "stamina":
          this.potions.stamina++;
          break;
        case "speed":
          this.potions.speed++;
          break;
      }
    }
  }

  showCost(i): void {
    let collection = document.getElementsByClassName("cost") as HTMLCollectionOf<HTMLElement>;
    collection[i].style.opacity = "1";
  }
  hideCost(i): void {
    let collection = document.getElementsByClassName("cost") as HTMLCollectionOf<HTMLElement>;
    collection[i].style.opacity = "0";
  }

  addStrength(): void {
    if (this.player.gold >= this.strengthCost) {
      this.player.strength++;
      this.player.damage = this.player.strength * 3;
      this.player.basePoints[0]++;

      this.player.gold -= this.strengthCost;
      this.strengthCost = Math.round(
        (this.player.basePoints[0] + 5) * ((this.player.basePoints[0] + 1) / 3)
      );
      this.socket.updatePlayer(this.player);
    }
  }
  addSpeed(): void {
    if (this.player.gold >= this.speedCost) {
      this.player.speed++;
      this.player.basePoints[2]++;

      this.player.gold -= this.speedCost;
      this.speedCost = Math.round(
        (this.player.basePoints[2] + 5) *
          ((this.player.basePoints[2] + 1) / 2) *
          1.2
      );
      this.socket.updatePlayer(this.player);
    }
  }
  addHealth(): void {
    if (this.player.gold >= this.hpCost) {
      this.player.hitPoints += 55;
      this.player.hitPoints *= 1.065;
      this.player.hitPoints = Math.round(this.player.hitPoints);
      this.player.basePoints[3]++;

      this.player.gold -= this.hpCost;
      this.hpCost = Math.round(
        (this.player.basePoints[3] + 5) *
          ((this.player.basePoints[3] + 1) / 1.5) *
          1.15
      );
      this.socket.updatePlayer(this.player);
    }
  }
  addLuck(): void {
    if (this.player.gold >= this.luckCost) {
      this.player.luck++;
      this.player.basePoints[4]++;

      this.player.gold -= this.luckCost;
      this.luckCost = Math.round(
        (this.player.basePoints[4] + 5) * (this.player.basePoints[4] + 1) * 1.15
      );
      this.socket.updatePlayer(this.player);
    }
  }
  addStamina(): void {
    if (this.player.gold >= this.staminaCost) {
      this.player.stamina++;
      this.player.staminaLeft++;
      this.player.basePoints[1]++;

      this.player.gold -= this.staminaCost;
      this.staminaCost += 2;
      this.socket.updatePlayer(this.player);
    }
  }

  ngOnInit(): void {
    this.costUpdate();
  }

  costUpdate(): void {
    this.strengthCost = Math.round(
      (this.player.basePoints[0] + 5) * ((this.player.basePoints[0] + 1) / 3)
    );
    this.staminaCost = 10 + this.player.basePoints[1] * 2;

    this.speedCost = Math.round(
      (this.player.basePoints[2] + 5) *
        ((this.player.basePoints[2] + 1) / 2) *
        1.2
    );

    this.hpCost = Math.round(
      (this.player.basePoints[3] + 5) *
        ((this.player.basePoints[3] + 1) / 1.5) *
        1.15
    );

    this.luckCost = Math.round(
      (this.player.basePoints[4] + 5) * (this.player.basePoints[4] + 1) * 1.15
    );
  }

  setDefault(): void {
    let items = document.getElementsByClassName("item") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < items.length; i++) {
      items[i].style.cursor = "grab";
    }
  }

  weaponDrop($event: CdkDragEnd): void {
    this.weaponPos = { x: 0, y: 0 };
    this.setDefault();
  }
  armorDrop($event: CdkDragEnd): void {
    this.armorPos = { x: 0, y: 0 };
    this.setDefault();
  }
  necklaceDrop($event: CdkDragEnd): void {
    this.necklacePos = { x: 0, y: 0 };
    this.setDefault();
  }
  ringDrop($event: CdkDragEnd): void {
    this.ringPos = { x: 0, y: 0 };
    this.setDefault();
  }
  startDrag(): void {
    let items = document.getElementsByClassName("item") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < items.length; i++) {
      items[i].style.cursor = "grabbing";
    }
  }

  backHome(): void {
    this.player.location = "home";
    setTimeout(() => {
      document.getElementById("cont").style.opacity = "1";

      let assets = document.getElementsByClassName("assets")[0];
      assets.innerHTML = "";
      assets.appendChild(this.images.gold);
      assets.append(this.player.gold.toString());
    }, 10);
  }
}
