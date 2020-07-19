import { Component, OnInit, Input } from "@angular/core";
import { User } from "../../models/user.model";
import { MissionsService } from "src/app/missions.service";
import { Weapon } from "../../models/items/weapon.model";
import { AudioService } from "src/app/audio.service";
import { PlayerAnimations } from "../../animations/player.animation";
import { AdditionAnimations } from "../../animations/additions.animation";
import { Socket } from "ngx-socket-io";
import { SocketService } from "src/app/socket.service";

@Component({
  selector: "app-missions",
  templateUrl: "./missions.component.html",
  styleUrls: ["./missions.component.scss"],
  animations: [PlayerAnimations.showUp, AdditionAnimations.grabGoldUp],
})
export class MissionsComponent implements OnInit {
  @Input("user") player: User;

  missionFinished: boolean = true;
  afterMission: boolean = false;
  showAlert: boolean = false;

  alertInput: string = "";

  missionNumber: number = 0;
  sumGold: number = 0;

  coins: Array<any> = [];
  amount = [];

  missionInterval: any;

  constructor(
    private missions: MissionsService,
    private audio: AudioService,
    private socket: SocketService
  ) {}

  ngOnInit(): void {}

  endMission(): void {
    this.missions.needed[this.player.missionNumber] = true;

    setTimeout(() => {
      switch (this.player.missionNumber) {
        case 0:
          this.missions.generateMissionOne(this.player.level);
          break;
        case 1:
          this.missions.generateMissionTwo(this.player.level);
          break;
        case 2:
          this.missions.generateMissionThreeFour(this.player.level, 2);
          break;
        case 3:
          this.missions.generateMissionThreeFour(this.player.level, 3);
          break;
      }
    }, 100);

    this.afterMission = false;

    this.player.exp += this.missions.missions[this.missionNumber].exp;

    this.player.missionTime = -3;
    this.player.missionOn[this.player.missionNumber] = false;
    this.socket.updatePlayer(this.player);
  }

  getType(i): number {
    return this.missions.missions[i].type;
  }
  getMissionDesc(i): string {
    return this.missions.missions[i].description;
  }
  getMissionExp(i): number {
    return this.missions.missions[i].exp;
  }

  getMissionTime(i, time = 0): string {
    let t = 0;
    if (!time) {
      t = this.missions.missions[i].time;
    } else {
      t = time;
    }
    let m = Math.floor(t / 60);
    let s = t % 60;
    let s0 = s.toString();

    if (s < 10) s0 = "0" + s;

    return m + ":" + s0;
  }
  getMissionsAdd(i): string {
    return this.missions.missions[i].additions;
  }

  getMissionStatus(i): string {
    return (
      this.missions.missions[i].done + " / " + this.missions.missions[i].sum
    );
  }

  missionDone(i): boolean {
    return this.missions.missions[i].done / this.missions.missions[i].sum == 1
      ? true
      : false;
  }

  turnMissionBack(i): void {
    if (this.missions.missions[i].done / this.missions.missions[i].sum == 1) {
      this.startMission(i);
    }
  }

  startMission(i): void {
    this.player.missionNumber = i;

    this.player.missionTime = this.missions.missions[i].time;
    this.player.missionStart = this.missions.missions[i].time;
    this.socket.updatePlayer(this.player);
    this.missionInterval = setInterval(() => {
      this.player.missionTime -= 1;
      if (this.player.missionTime <= 0) {
        this.missionFinished = true;
        this.player.missionOn[this.player.missionNumber] = false;
        clearInterval(this.missionInterval);
        this.socket.updatePlayer(this.player);
      }
    }, 1000);
  }

  undertakeMission(i): void {
    if (this.player.missions > 0) {
      this.missions.missions[i].partaken = true;
      this.player.missionOn[i] = true;
      this.player.missions--;
      if (i > 1) {
        this.startMission(i);
      }
    } else {
      this.alertOut("You can't go on more missions");
    }
  }

  getLoot(): any[] {
    return this.missions.missions[this.player.missionNumber].loot;
  }

  showCoins(bag: any): void {
    if (bag.perks != undefined) {
      this.showInfo(bag);
    }

    if (bag.coins != undefined) {
      for (let i = bag.coins + Math.random() * this.player.luck; i > 0; ) {
        let x = i >= 30 ? 30 : i >= 5 ? 5 : 1;

        this.coins.push([
          x,
          "assets/coin/" + x + ".png",
          Math.random() * 12 - 6 + bag.offset,
          "static",
        ]);
        this.sumGold += x;
        i -= x;

        let index = this.coins.length - 1;

        setTimeout(() => {
          this.coins[index][3] = "collected";

          setTimeout(() => {
            this.player.gold += this.coins[index][0];
            let coins = document.getElementsByClassName(
              "coin"
            ) as HTMLCollectionOf<HTMLElement>;
            coins[index].style.display = "none";
          }, 600);
        }, Math.random() * 300 + 100);
      }

      let index = this.missions.missions[
        this.player.missionNumber
      ].loot.indexOf(bag);
      this.missions.missions[this.player.missionNumber].loot.splice(index, 1);

      if (this.missions.missions[this.player.missionNumber].loot.length < 1) {
        setTimeout(() => {
          this.missionFinished = true;
          this.afterMission = true;
        }, 1000);
      }

      this.audio.openSmallMoneyBag();
    }
  }

  collectItem(item: Weapon): void {
    this.hideInfo();

    if (item.code != undefined) {
      if (this.player.items.length < 27) {
        if (!this.player.items.includes(item)) {
          item.player_id = this.player.id;
          this.player.items.push(item);
        }
      }

      setTimeout(() => {
        let index = this.missions.missions[
          this.player.missionNumber
        ].loot.indexOf(item);
        this.missions.missions[this.player.missionNumber].loot.splice(index, 1);

        if (this.missions.missions[this.player.missionNumber].loot.length < 1) {
          this.missionFinished = true;
          this.afterMission = true;
        }
      }, 600);
    }
    this.socket.updatePlayer(this.player);
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

  alertOut(input): void {
    this.alertInput = input;
    this.showAlert = true;
  }
  alertOff(): void {
    this.showAlert = false;
  }
}
