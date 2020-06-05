import { Injectable } from "@angular/core";
import { Mission } from "./dungeons/models/mission.model";
import { DungeonsService } from "./dungeons.service";

@Injectable({
  providedIn: "root",
})
export class MissionsService {
  missions: Array<Mission> = [];

  needed: Array<boolean> = [true, true, true, true];

  elites = [
    "Cyclope",
    "Ork",
    "Giant",
    "Cerberus",
    "Severus Snake",
    "Dragonito Reclito",
  ];

  dungeons = [
    "Green Forest",
    "Forst Ablaze",
    "Forst of Darkness",
    "Teleporting Woods",
    "Disaster Cave",
    "Desolate Caves",
    "Orks's Mine",
    "Woods of Elfs",
    "Dark Mountains",
    "Fiord Lake",
    "Freezing Vulcano",
    "Holy Three",
  ];

  missionNames = [
    "Go on a journey to Sky Island",
    "Find The Experience Mushroom in Fire Forest",
    "Look for a Hunter that got lost while exploring The Dark Mountains",
    "Help Explorer Jim find his long lost daughter",
    "Get rid of the monster that roams around The Village",
    "Put some caurage into The Defenders of The Village",
    "Help clean up after the war with Mazgors",
  ];

  constructor(private generator: DungeonsService) {}

  loot;

  pushToMissions(lvl, name, addname, time, add, type, sum = 0) {
    let exp = Math.round(
      lvl * (lvl / 2) * 300 + Math.round(Math.random() * lvl * 123)
    );
    this.loot = this.generator.createLoot(
      Math.floor(lvl / 3) + 1,
      Math.round(Math.random() * 15) + 1,
      lvl + 3
    );

    this.needed[type] = false;

    this.missions[type] = new Mission(
      name,
      addname,
      add,
      time,
      exp,
      this.loot,
      type,
      false,
      false,
      sum,
      0
    );
  }

  generateMissionOne(lvl) {
    if (this.needed[0]) {
      let name = "Take out Elite ";

      let r = Math.floor((Math.random() * lvl) / 7);

      if (r > this.elites.length - 1) {
        r = this.elites.length - 1;
      }

      name += this.elites[r];

      let amount = Math.round(Math.random() * 4 + 1);

      let add = " " + amount + " times in 24 hours";

      //  description: string;
      //  time: number;
      //  exp: number;
      //  gold: number;
      //  type: number;
      //  partaken: boolean;
      //  finished: boolean;

      this.pushToMissions(lvl, name, this.elites[r], 0, add, 0, amount);
    }
  }

  generateMissionTwo(lvl) {
    if (this.needed[1]) {
      let name = "Get Through ";

      let r = Math.floor((Math.random() * lvl) / 5);

      if (r > this.dungeons.length - 1) {
        r = this.dungeons.length - 1;
      }

      name += this.dungeons[r];

      let amount = Math.round(Math.random() * 2 + 1);

      let add = " " + amount + " times in 24 hours";

      this.pushToMissions(lvl, name, this.dungeons[r], 0, add, 1, amount);
    }
  }

  generateMissionThreeFour(lvl, type) {
    if (this.needed[2] || this.needed[3]) {
      let r = Math.floor(Math.random() * this.missionNames.length);

      let mName = this.missionNames[r];

      this.pushToMissions(
        lvl,
        mName,
        "",
        Math.round(Math.random() * 100) + 100,
        "",
        type
      );
    }
  }

  areMissionsNeeded() {
    return this.needed[0] || this.needed[1] || this.needed[2] || this.needed[3]
      ? true
      : false;
  }
}
