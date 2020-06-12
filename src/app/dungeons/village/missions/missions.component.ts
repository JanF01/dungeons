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

  missionInterval: any;
  missionNumber: number = 0;
  coins: Array<any> = [];
  missionFinished: boolean = true;
  sumGold: number = 0;
  afterMission: boolean = false;
  amount = [];

  showAlert: boolean = false;
  alertInput: string = "";

  constructor(
    private missions: MissionsService,
    private audio: AudioService,
    private socket: SocketService
  ) {}

  ngOnInit(): void {}

  endMission() {
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

  getType(i) {
    return this.missions.missions[i].type;
  }
  getMissionDesc(i) {
    return this.missions.missions[i].description;
  }
  getMissionExp(i) {
    return this.missions.missions[i].exp;
  }

  getMissionTime(i, time = 0) {
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
  getMissionsAdd(i) {
    return this.missions.missions[i].additions;
  }

  getMissionStatus(i) {
    return (
      this.missions.missions[i].done + " / " + this.missions.missions[i].sum
    );
  }

  missionDone(i) {
    return this.missions.missions[i].done / this.missions.missions[i].sum == 1
      ? true
      : false;
  }

  turnMissionBack(i) {
    if (this.missions.missions[i].done / this.missions.missions[i].sum == 1) {
      this.startMission(i);
    }
  }

  startMission(i) {
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

  undertakeMission(i) {
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

  getLoot() {
    return this.missions.missions[this.player.missionNumber].loot;
  }

  showCoins(bag: any) {
    if (bag.perks != undefined) {
      this.showInfo(bag);
    }

    if (bag.coins != undefined) {
      for (let i = bag.coins + Math.random() * this.player.luck; i > 0; ) {
        if (i >= 30) {
          this.coins.push([
            30,
            "assets/coin/30.png",
            Math.random() * 12 - 6 + bag.offset,
            "static",
          ]);
          this.sumGold += 30;
          i -= 30;
        } else if (i >= 5) {
          this.coins.push([
            5,
            "assets/coin/5.png",
            Math.random() * 12 - 6 + bag.offset,
            "static",
          ]);
          this.sumGold += 5;
          i -= 5;
        } else {
          this.coins.push([
            1,
            "assets/coin/1.png",
            Math.random() * 12 - 6 + bag.offset,
            "static",
          ]);
          this.sumGold += 1;
          i -= 1;
        }
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

  collectItem(item: Weapon) {
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

  alertOut(input) {
    this.alertInput = input;
    this.showAlert = true;
  }
  alertOff() {
    this.showAlert = false;
  }
}
