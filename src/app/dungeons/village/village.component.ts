import { Component, OnInit, Input, ɵPlayer, ViewChild } from "@angular/core";
import { User } from "../models/user.model";
import { ImagesService } from "src/app/images.service";
import { BlacksmithComponent } from "./blacksmith/blacksmith.component";
import { ArmoryComponent } from "./armory/armory.component";
import { Armor } from "../models/items/armor.model";
import { Weapon } from "../models/items/weapon.model";
import { AudioService } from "src/app/audio.service";
import { MissionsService } from "src/app/missions.service";
import { MissionsComponent } from "./missions/missions.component";
import { SocketService } from "src/app/socket.service";

@Component({
  selector: "app-village",
  templateUrl: "./village.component.html",
  styleUrls: ["./village.component.scss"],
})
export class VillageComponent implements OnInit {
  @Input("user") player: User;
  @ViewChild(ArmoryComponent) armory: ArmoryComponent;
  @ViewChild(MissionsComponent) mission: MissionsComponent;

  village = "village";

  villageLocation: string = "village";

  constructor(
    private images: ImagesService,
    private audio: AudioService,
    private missions: MissionsService,
    private socket: SocketService
  ) {}

  ngOnInit(): void {}

  backHome() {
    this.player.location = "home";
    this.audio.stopVillageMusic();
    this.audio.playBackgroundOne();

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

  goToMissions() {
    this.villageLocation = "missions";

    if (this.missions.areMissionsNeeded()) {
      this.missions.generateMissionOne(this.player.level);
      this.missions.generateMissionTwo(this.player.level);
      this.missions.generateMissionThreeFour(this.player.level, 2);
      this.missions.generateMissionThreeFour(this.player.level, 3);
    }

    setTimeout(() => {
      document.getElementById("inner").style.opacity = "1";
      document.getElementById("inner").appendChild(this.images.missions);
      this.images.village.style.display = "none";
      for (let i = this.player.maxMissions; i > 0; i--) {
        this.mission.amount.push(i);
      }
    }, 50);
  }

  goToArmory() {
    this.villageLocation = "armory";

    setTimeout(() => {
      this.armory.newAsortament();

      document.getElementById("inner").style.opacity = "1";
      document.getElementById("inner").appendChild(this.images.blacksmith);
      this.images.village.style.display = "none";
    }, 50);
  }

  goToBlacksmith() {
    this.villageLocation = "blacksmith";

    setTimeout(() => {
      document.getElementById("inner").style.opacity = "1";
      document.getElementById("inner").appendChild(this.images.blacksmith);
      this.images.village.style.display = "none";
    }, 50);
  }

  backToVillage() {
    this.villageLocation = "village";

    document.getElementById("inner").style.opacity = "0";
    this.images.village.style.display = "block";

    this.player.itemsOnHold = [];
  }
}
