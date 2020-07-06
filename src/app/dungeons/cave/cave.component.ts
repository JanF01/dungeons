import { Component, Input } from "@angular/core";
import { User } from "../models/user.model";
import { MoneyBag } from "../models/moneyBag.model";
import { Enemy } from "../models/enemy.model";
import { PlayerAnimations } from "../animations/player.animation";
import { EnemyAnimations } from "../animations/enemy.animation";
import { AdditionAnimations } from "../animations/additions.animation";
import { AudioService } from "../../audio.service";
import { DungeonsService } from "../../dungeons.service";
import { ImagesService } from "../../images.service";
import { Item } from "../models/item.model";
import { Weapon } from "../models/items/weapon.model";
import { MissionsService } from "../../missions.service";
import { UpdateService } from "../../update.service";
import { SocketService } from "../../socket.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-cave",
  templateUrl: "./cave.component.html",
  styleUrls: ["./cave.component.scss"],
  animations: [
    PlayerAnimations.showUp,
    PlayerAnimations.momentum,
    PlayerAnimations.swordMomentum,
    PlayerAnimations.takeDamage,
    PlayerAnimations.levelUp,
    EnemyAnimations.enemyAnimation,
    EnemyAnimations.enemyAttack,
    AdditionAnimations.showDamage,
    AdditionAnimations.grabGold,
    AdditionAnimations.showLevelUp,
  ],
})
export class CaveComponent {
  @Input("user") player: User;

  speed: number = 0.5;

  fighting: boolean = true;

  coins: Array<any> = [];

  playerAnimation: string = "back";
  swordAnimation: string = "back";
  enemyState: string = "back";
  showDamage: boolean = false;
  enemyDamage: Array<any> = [];
  playerDamage: Array<any> = [];
  playerLevelUp: boolean = false;
  enemyHit: boolean = false;
  showLoot: boolean = false;
  showItemsLooted: boolean = false;
  enemy: Enemy;
  speedBuildUp = 0;
  potions = {
    hp: 0,
    stamina: 0,
    speed: 0,
  };
  DI = 1;
  healing: any;
  weaponMulti: number;
  elite: boolean = false;
  label: string = "";

  multipliers = [0, 0, 0];

  monstersInCave: number = 0;

  playerIsDead: boolean = false;

  showAlert: boolean = false;
  alertInput: string = "";
  showedAlert: boolean = true;

  challangeSub: Subscription;

  constructor(
    private audio: AudioService,
    private dungeons: DungeonsService,
    private images: ImagesService,
    private missions: MissionsService,
    private socket: SocketService
  ) {
    this.enemy = this.dungeons.dungeons[0].monsters[0];
  }

  alertOut(input) {
    this.alertInput = input;
    this.showAlert = true;
  }
  alertOff() {
    this.showAlert = false;
  }

  backHome() {
    this.showItemsLooted = false;

    while (this.player.loot[0] != undefined) {
      if (this.player.items.length < 27) {
        this.player.items.push(this.player.loot[0]);
      }
      this.player.loot.splice(0, 1);
    }

    this.socket.updatePlayer(this.player);

    this.player.location = "home";
    this.player.gold += this.player.goldInSack;
    this.player.goldInSack = 0;
    this.audio.stopDungeonMusic();
    this.audio.playBackgroundOne();
    setTimeout(() => {
      let mBck = document.getElementsByClassName("mainBck") as HTMLCollectionOf<
        HTMLElement
      >;
      mBck[0].style.opacity = "0.8";
      document.getElementById("cont").style.opacity = "1";

      this.player.speed -= this.player.speedBuildUp;
      this.player.speedBuildUp = 0;

      let assets = document.getElementsByClassName("assets")[0];
      assets.innerHTML = "";
      assets.appendChild(this.images.gold);
      assets.append(this.player.gold.toString());
    }, 10);
  }

  goBackToMap() {
    this.showItemsLooted = false;

    this.player.location = "dungeons";
    this.audio.dungeonsBck.volume = 0.065 * this.audio.globalVolume;
    setTimeout(() => {
      document.getElementById("dungeons").style.opacity = "1";
      document.getElementById("dungeons").appendChild(this.images.map);
      this.player.speed -= this.player.speedBuildUp;
      this.player.speedBuildUp = 0;
    }, 60);
  }

  getDarkness() {
    return this.images.darkness.src;
  }
  getFire() {
    return this.images.fire.src;
  }
  getIce() {
    return this.images.ice.src;
  }

  necklaceRingPerk() {
    switch (this.player.weapon.perks) {
      case "fire":
      case "fireice":
      case "fireicedarkness":
        if (
          this.player.necklace.perks == "fire" ||
          this.player.necklace.perks == "fireice" ||
          this.player.necklace.perks == "fireicedarkness"
        ) {
          this.multipliers[0] += 0.03;
        }
        if (
          this.player.ring.perks == "fire" ||
          this.player.ring.perks == "fireice" ||
          this.player.ring.perks == "fireicedarkness"
        ) {
          this.multipliers[0] += 0.03;
        }
        break;
      case "ice":
      case "fireice":
      case "darknessice":
      case "fireicedarkness":
        if (
          this.player.necklace.perks == "ice" ||
          this.player.necklace.perks == "fireice" ||
          this.player.necklace.perks == "fireicedarkness"
        ) {
          this.multipliers[1] += 0.03;
        }
        if (
          this.player.ring.perks == "ice" ||
          this.player.ring.perks == "fireice" ||
          this.player.ring.perks == "fireicedarkness"
        ) {
          this.multipliers[1] += 0.03;
        }
        break;
      case "darkness":
      case "darknessice":
      case "fireicedarkness":
        if (
          this.player.necklace.perks == "darkness" ||
          this.player.necklace.perks == "fireicedarkness"
        ) {
          this.multipliers[2] += 0.03;
        }
        if (
          this.player.ring.perks == "darkness" ||
          this.player.ring.perks == "fireicedarkness"
        ) {
          this.multipliers[2] += 0.03;
        }
        break;
    }
  }

  enemyDead() {
    this.enemyState = "die";
    this.showLoot = true;
    this.audio.enemyDead();
    let add = Math.round(
      (this.player.dungeon + 2) *
        this.enemy.level *
        Math.round(Math.random() * 9 + 50) *
        this.player.expMulti
    );
    this.player.exp += add;

    if (this.player.exp >= this.player.nextExp) {
      this.player.level++;
      setTimeout(() => {
        this.playerDamage.push(["LEVEL " + this.player.level, false, "lvl"]);
        setTimeout(() => {
          this.playerDamage.shift();
        }, 2700);
        setTimeout(() => {
          this.levelUp();
          this.audio.levelUp();
        }, 20);
      }, 30);
      this.player.nextExp = Math.round(
        this.player.level * (this.player.level * 0.4) * 928
      );
      this.player.exp = 0;
    } else {
      this.playerDamage.push(["+ " + add + "EXP", false, "exp"]);

      this.showPlayerDamage();
    }

    if (this.player.missionOn[0] && this.elite) {
      if (this.missions.missions[0].name == this.enemy.name) {
        if (this.missions.missions[0].done < this.missions.missions[0].sum)
          this.missions.missions[0].done++;
      }
    }

    this.deteriorateItems();
  }

  tour() {
    this.DI += 0.1;

    this.playerTurn();

    if (Math.random() * 100 <= 100 - this.player.speed * 2 + this.enemy.level) {
      setTimeout(() => {
        this.enemy.health > 0 ? this.enemyTurn() : this.enemyDead();
      }, 1111 * this.speed);
    } else {
      setTimeout(() => {
        this.enemy.health > 0 ? this.tour() : this.enemyDead();
      }, 1111 * this.speed);
    }
  }

  nextFight(lvl) {
    document.getElementById("d").style.opacity = "1";
    document.getElementById("d").appendChild(this.images.map);

    this.enemy = this.dungeons.dungeons[lvl - 1].monsters[
      this.player.subdungeon[this.player.dungeon]
    ];

    this.enemy.health = this.enemy.hitPoints;
    this.showLoot = false;
    this.enemyState = "back";
    this.coins = [];

    this.fighting = true;
  }

  organize() {
    this.showItemsLooted = false;

    clearInterval(this.healing);

    this.player.weapon.type == "legend"
      ? (this.weaponMulti = 0.16)
      : (this.weaponMulti = 0.22);

    this.multipliers[0] = this.weaponMulti;
    this.multipliers[1] = this.weaponMulti;
    this.multipliers[2] = this.weaponMulti;

    this.necklaceRingPerk();

    this.DI = 1;
    this.potions.hp = 0;
    this.potions.stamina = 0;
    this.potions.speed = 0;
  }

  prepPotions() {
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

  confirmSub: Subscription;
  pvpOn: boolean = false;
  awaitPvp = false;

  challenge(challenge) {
    this.label = this.player.name + " vs " + challenge.name;
    this.socket.challenge(challenge);
    this.enemy = challenge;
    this.awaitPvp = true;
    this.confirmSub = this.socket.confirmed.subscribe((confirm) => {
      this.awaitPvp = false;
      this.pvpOn = true;
      this.pvp(challenge);
    });
  }

  damageSub: Subscription;
  defendSub: Subscription;

  prepToFight() {
    this.label = this.player.name + " vs " + this.enemy.name;
    this.organize();
    this.defendSub = this.socket.dmg.subscribe((damage) => {
      this.enemyTurn(damage);
    });
  }

  pvp(challenge) {
    this.organize();
    this.audio.dungeonsBck.volume = 0.02 * this.audio.globalVolume;
    this.playerTurn();
    this.pvpOn = true;
    this.damageSub = this.socket.dmg.subscribe((dmg) => {
      console.log("too many");
      this.enemyTurn(dmg);
    });
  }

  fight(lvl, elite) {
    if (this.player.loot.length < 8 || this.showedAlert) {
      this.pvpOn = false;
      this.organize();

      this.player.dungeon = lvl - 1;
      this.label = this.dungeons.dungeons[this.player.dungeon].label;

      this.enemy = this.dungeons.dungeons[this.player.dungeon].monsters[
        this.player.subdungeon[this.player.dungeon]
      ];

      this.prepPotions();

      this.audio.dungeonsBck.volume = 0.02 * this.audio.globalVolume;
      this.nextFight(lvl);
      this.tour();
    } else {
      this.alertOut("You don't have space for loot!");
      this.showedAlert = true;
    }
  }

  critical = 1;

  playerTurn() {
    let dmg;

    setTimeout(() => {
      this.playerAnimation = "playerTurn";

      Math.random() < this.player.necklace.critical
        ? (this.critical = 1 + this.player.ring.critM)
        : (this.critical = 1);
      dmg = Math.round(
        this.player.strength *
          (this.player.weapon.damageLow +
            Math.random() *
              (this.player.weapon.damageHigh - this.player.weapon.damageLow)) *
          this.critical
      );
    }, 11 * this.speed);

    setTimeout(() => {
      this.throwSword();
    }, 411 * this.speed);

    setTimeout(() => {
      this.hitEnemy(dmg);
    }, 711 * this.speed);

    setTimeout(() => {
      this.enemyHurt(dmg);
    }, 911 * this.speed);
  }

  block = 0;
  blocked = false;

  enemyDouble = false;

  enemyTurn(playerDmg = []) {
    this.enemyFireball();

    this.blocked = false;
    let dmg;

    this.block = Math.random() * 100;
    if (this.block < this.player.armor.chance) {
      if (playerDmg.length > 0) {
        for (let i = 0; i < playerDmg.length; i++) {
          playerDmg[i][0] -= this.player.armor.defence;
        }
      } else {
        dmg = this.enemy.damage - this.player.armor.defence;
        this.blocked = true;
      }
    } else {
      if (playerDmg.length <= 0) dmg = this.enemy.damage;
    }

    if (playerDmg.length <= 0) {
      if (dmg < 0) {
        dmg = 0;
      }
      playerDmg.push([Math.round(dmg), false, "dmg"]);
    } else {
      for (let i = 0; i < playerDmg.length; i++) {
        if (playerDmg[i][0] < 0) playerDmg[i][0] == 0;

        playerDmg[i][1] = false;
      }
    }

    setTimeout(() => {
      this.enemyHitAnimation(playerDmg);
    }, 660 * this.speed);

    setTimeout(() => {
      this.playerHurt(playerDmg);
      setTimeout(() => {
        if (this.checkIfAlive()) {
          if (!this.pvpOn) {
            if (
              Math.random() < this.enemy.level / this.player.level / 10 &&
              !this.enemyDouble
            ) {
              setTimeout(() => {
                this.enemyTurn();
              }, 233 * this.speed);
              this.enemyDouble = true;
            } else {
              this.tour();
              this.enemyDouble = false;
            }
          } else {
            this.playerTurn();
            this.enemyDouble = false;
          }
        } else {
          if (this.pvpOn) this.playerDead();
        }
      }, 600 * this.speed);
    }, 860 * this.speed);
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
          i -= 30;
        } else if (i >= 5) {
          this.coins.push([
            5,
            "assets/coin/5.png",
            Math.random() * 12 - 6 + bag.offset,
            "static",
          ]);
          i -= 5;
        } else {
          this.coins.push([
            1,
            "assets/coin/1.png",
            Math.random() * 12 - 6 + bag.offset,
            "static",
          ]);
          i -= 1;
        }
        let index = this.coins.length - 1;

        setTimeout(() => {
          this.coins[index][3] = "collected";

          setTimeout(() => {
            this.player.goldInSack += this.coins[index][0];
          }, 600);
        }, Math.random() * 300 + 100);
      }

      let index = this.enemy.loot.indexOf(bag);
      this.enemy.loot.splice(index, 1);

      if (this.enemy.loot.length < 1) {
        setTimeout(() => {
          this.nextDungeon();
        }, 1000);
      }

      this.audio.openSmallMoneyBag();
    }
  }

  collectItem(item: Weapon) {
    this.hideInfo();

    if (item.code != undefined) {
      if (this.player.loot.length < 8) {
        if (!this.player.loot.includes(item)) {
          item.player_id = this.player.id;
          this.player.loot.push(item);
        }
      }

      setTimeout(() => {
        let index = this.enemy.loot.indexOf(item);
        this.enemy.loot.splice(index, 1);

        if (this.enemy.loot.length < 1) {
          this.nextDungeon();
        }
      }, 600);
    }
  }

  nextDungeon() {
    this.hideInfo();
    this.fighting = false;

    if (this.elite) {
      this.dungeons.reFillElite(this.player.dungeon - 12);
      this.dungeons.dungeons[this.player.dungeon].completed = 1;
      this.player.subdungeon[this.player.dungeon] = 0;
      this.audio.win();

      this.goBackToMap();
    } else {
      if (
        this.player.subdungeon[this.player.dungeon] <
        this.dungeons.dungeons[this.player.dungeon].monsters.length - 1
      ) {
        this.player.subdungeon[this.player.dungeon]++;
        this.enemy = this.dungeons.dungeons[this.player.dungeon].monsters[
          this.player.subdungeon[this.player.dungeon]
        ];

        if (
          this.player.subdungeon[this.player.dungeon] >
          this.dungeons.dungeons[this.player.dungeon].completed
        ) {
          this.dungeons.dungeons[this.player.dungeon].completed++;
        }
      } else {
        this.dungeons.reFillDungeon(this.player.dungeon);

        if (this.player.missionOn[1] && !this.elite) {
          if (
            this.dungeons.dungeons[this.player.dungeon].label ==
            this.missions.missions[1].name
          ) {
            this.missions.missions[1].done++;
          }
        }

        if (
          this.player.subdungeon[this.player.dungeon] ==
          this.dungeons.dungeons[this.player.dungeon].completed
        ) {
          this.dungeons.dungeons[this.player.dungeon].completed++;
          if (!this.dungeons.dungeons[this.player.dungeon + 1].open) {
            this.player.subdungeon[this.player.dungeon + 1] = 0;
            this.dungeons.dungeons[this.player.dungeon + 1].open = true;

            this.player.dungeonsOpen++;
          }
          this.dungeons.dungeons[this.player.dungeon].completed = 0;
        }

        this.player.subdungeon[this.player.dungeon] = 0;
        this.player.dungeon++;
        this.audio.win();
        this.goBackToMap();
      }
    }
    this.socket.updatePlayer(this.player);
  }

  //Status check

  checkIfAlive = () => {
    return this.player.health > 0 ? true : this.playerDead();
  };

  levelUp = () => {
    this.playerLevelUp = true;
    setTimeout(() => {
      this.playerLevelUp = false;
    }, 3000 * this.speed);
  };

  showPlayerDamage() {
    setTimeout(() => {
      this.playerDamage[this.playerDamage.length - 1][1] = true;
    }, 10 * this.speed);
    setTimeout(() => {
      this.playerDamage.shift();
    }, 1400);
  }
  showEnemyDamage() {
    setTimeout(() => {
      this.enemyDamage[this.enemyDamage.length - 1][1] = true;
    }, 10 * this.speed);
    setTimeout(() => {
      this.enemyDamage.shift();
    }, 1400);
  }

  //Animations

  //Player Animations

  playerDead() {
    this.audio.playerIsDead();
    this.playerIsDead = true;
    this.player.goldInSack = 0;

    this.player.subdungeon[this.player.dungeon] = 0;
    this.dungeons.dungeons[this.player.dungeon].completed = 0;

    this.player.loot = [];

    setTimeout(() => {
      this.backHome();
      this.player.health = 0;
      this.healing = setInterval(() => {
        if (
          this.player.health > this.player.hitPoints / 2 ||
          this.player.location == "dfight"
        ) {
          clearInterval(this.healing);
        }
        this.player.health++;
        if (this.player.health > this.player.hitPoints)
          this.player.health = this.player.hitPoints;
      }, 400);

      this.dungeons.reFillDungeon(this.player.dungeon);
    }, 1500);

    this.deteriorateItems();

    return false;
  }

  throwSword() {
    this.playerAnimation = "back";
    this.swordAnimation = "throw";
    this.audio.throwSword();
  }

  hitEnemy(dmg) {
    this.audio.enemyDamage();
    this.swordAnimation = "back";
    this.enemyState = "takeDamage";

    this.enemy.health -= Math.round(dmg * this.DI);
    if (this.player.weapon.perks == "fire") {
      this.enemy.health -= Math.round(dmg * this.DI * this.multipliers[0]);
    } else if (this.player.weapon.perks == "ice") {
      this.enemy.health -= Math.round(dmg * this.DI * this.multipliers[1]);
    } else if (this.player.weapon.perks == "darkness") {
      this.enemy.health -= Math.round(dmg * this.DI * this.multipliers[2]);
    } else if (this.player.weapon.perks == "fireice") {
      this.enemy.health -= Math.round(dmg * this.DI * this.multipliers[0]);

      this.enemy.health -= Math.round(dmg * this.DI * this.multipliers[1]);
    } else if (this.player.weapon.perks == "darknessice") {
      this.enemy.health -= Math.round(dmg * this.DI * this.multipliers[1]);
      this.enemy.health -= Math.round(dmg * this.DI * this.multipliers[2]);
    } else if (this.player.weapon.perks == "fireicedarkness") {
      this.enemy.health -= Math.round(dmg * this.DI * this.multipliers[0]);
      this.enemy.health -= Math.round(dmg * this.DI * this.multipliers[1]);
      this.enemy.health -= Math.round(dmg * this.DI * this.multipliers[2]);
    }

    if (this.enemy.health < 0) {
      this.enemy.health = 0;
      if (this.pvpOn) {
        this.enemyDead();
        this.backHome();
      }
    }
  }

  playerHurt(dmg) {
    this.enemyHit = false;
    console.log(dmg);
    let i = 0;

    let interv = setInterval(() => {
      this.playerDamage.push([
        Math.round(dmg[i][0] * this.DI),
        dmg[i][1],
        dmg[i][2],
      ]);
      i++;
      this.showPlayerDamage();

      if (i >= dmg.length) {
        clearInterval(interv);
      }
    }, 200);
  }

  //Enemy Animations

  enemyFireball() {
    this.enemyState = "throwFireball";
    this.audio.throwFireball();
  }

  enemyHitAnimation(dmg) {
    this.enemyState = "back";
    if (dmg[0][0] != 0) {
      if (this.blocked) {
        this.audio.playBlock();
      }
      this.audio.takeDamage();
      this.enemyHit = true;
    } else {
      this.audio.playBlock();
    }

    for (let i = 0; i < dmg.length; i++) {
      this.player.health -= Math.round(dmg[i][0] * this.DI);
    }

    if (this.player.health < 0) {
      this.player.health = 0;
    }
  }

  perks = ["fire", "darkness", "ice"];

  damageToSocket(dmg) {
    if (this.pvpOn) {
      this.socket.sendDmg(dmg);
    }
  }

  enemyHurt(dmg) {
    this.enemyState = "back";
    this.enemyDamage.push([Math.round(dmg * this.DI), false, "normal"]);

    setTimeout(() => {
      if (
        this.player.weapon.perks == "fire" ||
        this.player.weapon.perks == "darkness" ||
        this.player.weapon.perks == "ice"
      ) {
        this.enemyDamage.push([
          Math.round(
            dmg *
              this.DI *
              this.multipliers[this.perks.indexOf(this.player.weapon.perks)]
          ),
          false,
          this.player.weapon.perks,
        ]);
        this.damageToSocket(this.enemyDamage);
        this.showEnemyDamage();
      } else if (
        this.player.weapon.perks == "fireice" ||
        this.player.weapon.perks == "darknessice"
      ) {
        this.enemyDamage.push([
          Math.round(dmg * this.DI * this.multipliers[1]),
          false,
          "ice",
        ]);

        setTimeout(() => {
          let perk = "fire";
          if (this.player.weapon.perks == "darknessice") perk = "darkness";
          this.enemyDamage.push([
            Math.round(
              dmg * this.DI * this.multipliers[this.perks.indexOf(perk)]
            ),
            false,
            perk,
          ]);
          this.damageToSocket(this.enemyDamage);
          this.showEnemyDamage();
          this.showEnemyDamage();
        }, 500 * this.speed);
      } else if (this.player.weapon.perks == "fireicedarkness") {
        this.enemyDamage.push([
          Math.round(dmg * this.DI * this.multipliers[1]),
          false,
          "ice",
        ]);
        this.showEnemyDamage();

        setTimeout(() => {
          this.enemyDamage.push([
            Math.round(dmg * this.DI * this.multipliers[0]),
            false,
            "fire",
          ]);
          this.showEnemyDamage();

          setTimeout(() => {
            this.enemyDamage.push([
              Math.round(dmg * this.DI * this.multipliers[2]),
              false,
              "darkness",
            ]);
            this.damageToSocket(this.enemyDamage);
            this.showEnemyDamage();
          }, 500 * this.speed);
        }, 500 * this.speed);
      } else {
        this.damageToSocket(this.enemyDamage);
      }
    }, 500 * this.speed);

    this.showEnemyDamage();
  }

  deteriorateItems() {
    if (this.player.weapon.name != "Fist") {
      switch (this.player.weapon.type) {
        case "normal":
          this.player.weapon.state -= 3;
          break;
        case "legend":
          this.player.weapon.state -= 2;
          break;
        case "artefact":
          this.player.weapon.state -= 1.5;
          break;
        case "revered":
        case "holy":
          this.player.weapon.state -= 1;
          break;
      }
    }
    if (this.player.armor.name != "none") {
      switch (this.player.armor.type) {
        case "normal":
          this.player.armor.state -= 3;
          break;
        case "legend":
          this.player.armor.state -= 2;
          break;
        case "artefact":
          this.player.armor.state -= 1.5;
          break;
        case "revered":
        case "holy":
          this.player.armor.state -= 1;
          break;
      }
    }

    if (this.player.weapon.state <= 0) {
      this.player.weapon.state = 0;
      this.player.weapon.cost = Math.round(this.player.weapon.cost * 0.1);
    }
    if (this.player.armor.state <= 0) {
      this.player.armor.state = 0;
      this.player.armor.cost = Math.round(this.player.armor.cost * 0.1);
    }
  }

  //bubble

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
}
