import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "./models/user.model";
import { Potion } from "./models/potion.model";
import { CaveComponent } from "./cave/cave.component";
import { AudioService } from "../audio.service";
import { DungeonsService } from "../dungeons.service";
import { ShopComponent } from "./shop/shop.component";
import { ImagesService } from "../images.service";
import { CharacterComponent } from "./character/character.component";
import { BackpackComponent } from "./backpack/backpack.component";
import { Armor } from "./models/items/armor.model";
import { Weapon } from "./models/items/weapon.model";
import { Necklace } from "./models/items/necklace.model";
import { Ring } from "./models/items/ring.model";
import { VillageComponent } from "./village/village.component";
import { Crystal } from "./models/items/crystal.model";
import { VerificationService, PlayerDetails } from "../verification.service";
import { UpdateService } from "../update.service";
import { SocketService } from "../socket.service";
import { Subscription, Subscribable } from "rxjs";

@Component({
  selector: "app-dungeons",
  templateUrl: "./dungeons.component.html",
  styleUrls: ["./dungeons.component.scss"],
})
export class DungeonsComponent implements OnInit {
  name: string = "Janke";
  inGame: boolean = true;
  inFight: boolean = false;
  @ViewChild(CaveComponent) cave: CaveComponent;
  @ViewChild(ShopComponent) shop: ShopComponent;
  @ViewChild(CharacterComponent) character: CharacterComponent;
  @ViewChild(BackpackComponent) backpack: BackpackComponent;
  @ViewChild(VillageComponent) village: VillageComponent;

  player: User = new User();
  mainBck: any;

  dungeonMode = "normal";

  showAlert: boolean = false;
  alertInput: string = "";
  enemyPlayer: User;
  private enemyPlayerSub: Subscription;
  private itemsSub: Subscription;

  private challengeSub: Subscription;

  private challenger: User;

  ngOnInit() {
    this.start();

    this.enemyPlayerSub = this.socket.enemyPlayer.subscribe((player) => {
      this.enemyPlayer = player;
    });

    this.challengeSub = this.socket.challenger.subscribe((player) => {
      this.challenger = player;
      this.alertOut(
        player.name + " LVL " + player.level + ", challenged you to a duel"
      );
    });

    this.itemsSub = this.socket.playerItems.subscribe((items) => {
      this.player.items = [];
      for (let item of items) {
        if (item.damageLow != undefined) {
          let weapon = new Weapon(
            item.player_id,
            item.type,
            item.name,
            item.graphic,
            item.code,
            item.perks,
            item.cost,
            item.damageLow,
            item.damageHigh,
            item.state
          );

          if (item.crystal_id != 0) {
            for (let item2 of items) {
              if (item.crystal_id == item2.id) {
                let gem = new Crystal(
                  this.player.id,
                  item2.type,
                  item2.name,
                  item2.graphic,
                  item2.code,
                  item2.perks,
                  item2.cost,
                  item2.amp,
                  item2.power
                );
                weapon.gem = gem;
              }
            }
          }

          if (!item.wearing) {
            this.player.items.push(weapon);
          } else {
            this.player.weapon = weapon;
          }
        } else if (item.defence != undefined) {
          let armor = new Armor(
            item.player_id,
            item.type,
            item.name,
            item.graphic,
            item.code,
            item.perks,
            item.cost,
            item.defence,
            item.chance,
            item.state
          );
          if (!item.wearing) {
            this.player.items.push(armor);
          } else {
            this.player.armor = armor;
          }
        } else if (item.critical != undefined) {
          let necklace = new Necklace(
            item.player_id,
            item.type,
            item.name,
            item.graphic,
            item.code,
            item.perks,
            item.cost,
            item.stamina,
            item.critical
          );
          if (!item.wearing) {
            this.player.items.push(necklace);
          } else {
            this.player.necklace = necklace;
          }
        } else if (item.critM != undefined) {
          let ring = new Ring(
            item.player_id,
            item.type,
            item.name,
            item.graphic,
            item.code,
            item.perks,
            item.cost,
            item.stamina,
            item.critM
          );
          if (!item.wearing) {
            this.player.items.push(ring);
          } else {
            this.player.ring = ring;
          }
        } else if (item.amp != undefined) {
          let crystal = new Crystal(
            item.player_id,
            item.type,
            item.name,
            item.graphic,
            item.code,
            item.perks,
            item.cost,
            item.amp,
            item.power,
            item.offset,
            item.clas
          );
          if (!item.wearing) {
            this.player.items.push(crystal);
          } else {
          }
        }
      }
      this.socket.updatePlayer(this.player);

      this.player.items.push(
        new Crystal(
          this.player.id,
          "normal",
          "crystal",
          "assets/crystal/normal_hp.png",
          "#222",
          "none",
          10,
          "dmg",
          0.15
        )
      );
    });
  }

  constructor(
    private audio: AudioService,
    private dungeons: DungeonsService,
    private images: ImagesService,
    private update: UpdateService,
    private socket: SocketService
  ) {}

  setPlayer(details: PlayerDetails) {
    let nextExp = Math.round(details.lvl * (details.lvl * 0.4) * 928);

    this.player = {
      id: details.id,
      name: details.login,
      level: details.lvl,
      exp: details.experience,
      expMulti: details.expmulti,
      nextExp: nextExp,
      gold: details.gold,
      basePoints: [],
      strength: details.strength,
      damage: details.strength * 3,
      hitPoints: details.health,
      health: details.hpleft,
      stamina: details.stamina,
      staminaLeft: details.staminaleft,
      speed: details.speed,
      speedBuildUp: 0,
      luck: details.luck,
      location: "home",
      dungeonsOpen: details.dungeon_open,
      dungeon: 0,
      subdungeon: [],
      goldInSack: 0,
      graphic: "assets/player/knight_blue_plus.png",
      weapon: new Weapon(
        details.id,
        "normal",
        "A Fricking Sword",
        "assets/weapon/1_2.png",
        "#00A11",
        "none",
        5,
        3,
        4,
        100
      ),
      armor: new Armor(
        details.id,
        "normal",
        "Shield Yourself",
        "assets/armor/1_1.png",
        "#00B12",
        "none",
        5,
        38,
        10,
        100
      ),
      necklace: new Necklace(
        details.id,
        "normal",
        "Necklace of Wisdom",
        "assets/necklace/1_1.png",
        "#00C01",
        "none",
        5,
        9,
        0.07
      ),
      ring: new Ring(
        details.id,
        "normal",
        "Ring of Beginnings",
        "assets/ring/1_1.png",
        "#00C01",
        "none",
        5,
        12,
        0.32
      ),
      potions: [
        new Potion("Health I", this.images.hpPotion, "hp", 600, "HP Potion"),
      ],
      items: [],
      itemsOnHold: [],
      loot: [],
      weaponsInShop: [
        new Weapon(
          details.id,
          "normal",
          "A Fricking Sword",
          "assets/weapon/1_2.png",
          "#00A11",
          "none",
          Math.round(2 * 2 * 0.8),
          Math.round(2 * 12) / 10 + 2,
          Math.round(2 * 12) / 10 + 2 + Math.round(2 / 4.5),
          100,
          Math.random() * 30 - 15,
          "normal"
        ),
        new Weapon(
          details.id,
          "normal",
          "A Fricking Sword",
          "assets/weapon/1_2.png",
          "#00A11",
          "none",
          Math.round(2 * 2 * 0.8),
          Math.round(2 * 12) / 10 + 2,
          Math.round(2 * 12) / 10 + 2 + Math.round(2 / 4.5),
          100,
          Math.random() * 30 - 15,
          "normal"
        ),
        new Weapon(
          details.id,
          "normal",
          "A Fricking Sword",
          "assets/weapon/1_2.png",
          "#00A11",
          "none",
          Math.round(2 * 2 * 0.8),
          Math.round(2 * 12) / 10 + 2,
          Math.round(2 * 12) / 10 + 2 + Math.round(2 / 4.5),
          100,
          Math.random() * 30 - 15,
          "normal"
        ),
      ],
      armorsInShop: [
        new Armor(
          details.id,
          "normal",
          "Shield Yourself",
          "assets/armor/1_1.png",
          "#00B12",
          "none",
          Math.round(2 * 2),
          Math.round((2 * 2) / 2) + 2 + 30,
          5 + Math.round(Math.random() * 5),
          100,
          Math.random() * 30 - 15,
          "normal"
        ),
        new Armor(
          details.id,
          "normal",
          "Shield Yourself",
          "assets/armor/1_1.png",
          "#00B12",
          "none",
          Math.round(2 * 2),
          Math.round((2 * 2) / 2) + 2 + 30,
          5 + Math.round(Math.random() * 5),
          100,
          Math.random() * 30 - 15,
          "normal"
        ),
        new Armor(
          details.id,
          "normal",
          "Shield Yourself",
          "assets/armor/1_1.png",
          "#00B12",
          "none",
          Math.round(2 * 2),
          Math.round((2 * 2) / 2) + 2 + 30,
          5 + Math.round(Math.random() * 5),
          100,
          Math.random() * 30 - 15,
          "normal"
        ),
      ],
      missionOn: [false, false, false, false],
      missionStart: 0,
      missionTime: -3,
      missionNumber: -1,
      maxMissions: 12,
      missions: 12,
    };

    this.player.basePoints[0] = details.bp_str;
    this.player.basePoints[1] = details.bp_hp;
    this.player.basePoints[2] = details.bp_sp;
    this.player.basePoints[3] = details.bp_stam;
    this.player.basePoints[4] = details.bp_luck;

    this.player.subdungeon[0] = details.d1;
    this.player.subdungeon[1] = details.d2;
    this.player.subdungeon[2] = details.d3;
    this.player.subdungeon[3] = details.d4;
    this.player.subdungeon[4] = details.d5;
    this.player.subdungeon[5] = details.d6;
    this.player.subdungeon[6] = details.d7;
    this.player.subdungeon[7] = details.d8;
    this.player.subdungeon[8] = details.d9;
    this.player.subdungeon[9] = details.d10;
    this.player.subdungeon[10] = details.d11;
    this.player.subdungeon[11] = details.d12;
    this.player.subdungeon[12] = details.d13;
    this.player.subdungeon[13] = details.d14;
    this.player.subdungeon[14] = details.d15;
    this.player.subdungeon[15] = details.d16;
    this.player.subdungeon[16] = details.d17;
    this.player.subdungeon[17] = details.d18;
    this.player.subdungeon[18] = details.d19;

    let open: Array<boolean> = [];

    for (let i = 0; i < 12; i++) {
      if (i < this.player.dungeonsOpen) {
        open.push(true);
      } else {
        open.push(false);
      }
    }

    this.dungeons.firstFill(
      [
        this.player.subdungeon[0],
        this.player.subdungeon[1],
        this.player.subdungeon[2],
        this.player.subdungeon[3],
        this.player.subdungeon[4],
        this.player.subdungeon[5],
        this.player.subdungeon[6],
        this.player.subdungeon[7],
        this.player.subdungeon[8],
        this.player.subdungeon[9],
        this.player.subdungeon[10],
        this.player.subdungeon[11],
        this.player.subdungeon[12],
        this.player.subdungeon[13],
        this.player.subdungeon[14],
        this.player.subdungeon[15],
        this.player.subdungeon[16],
        this.player.subdungeon[17],
        this.player.subdungeon[18],
      ],
      open
    );

    setTimeout(() => {
      this.mainBck = this.images.bckMain;
      document.getElementById("cont").style.opacity = "1";

      let assets = document.getElementsByClassName("assets")[0];

      assets.appendChild(this.images.gold);
      assets.append(this.player.gold.toString());
    }, 10);

    setTimeout(() => {
      this.socket.loginComplete(this.player);
    }, 200);
  }

  goToShop() {
    document.getElementById("mainBck").style.opacity = "0";
    this.player.location = "shop";
    setTimeout(() => {
      this.shop.showPotions();
    }, 50);
  }
  goToBackpack() {
    document.getElementById("mainBck").style.opacity = "0";
    this.player.location = "backpack";
    setTimeout(() => {
      this.backpack.showBackpack();
    }, 50);
  }

  goToCharacter() {
    this.player.location = "character";
    setTimeout(() => {
      this.character.countPotions();
    }, 100);
  }

  pvp(player) {
    player.health = player.hitPoints;
    this.player.location = "dfight";
    setTimeout(() => {
      this.cave.challenge(player);
    }, 100);
  }

  getDungeons() {
    return this.dungeons.dungeons;
  }
  getElites() {
    let elites = new Array();
    for (let i = 12; i < 19; i++) {
      elites.push(this.dungeons.dungeons[i]);
    }
    return elites;
  }

  goToArena() {
    this.audio.stopMusicBck();

    document.getElementById("mainBck").style.opacity = "0";
    this.player.location = "arena";
    setTimeout(() => {
      document.getElementById("arena").style.opacity = "1";
    }, 50);
  }

  goToVillage() {
    this.audio.stopMusicBck();
    this.audio.playVillageMusic();

    document.getElementById("mainBck").style.opacity = "0";
    this.player.location = "village";
    setTimeout(() => {
      document.getElementById("village").style.opacity = "1";
      document.getElementById("village").appendChild(this.images.village);
      document.getElementById("mainBck").style.opacity = "0";
      this.images.village.style.display = "block";
    }, 50);
  }

  check() {
    if (this.name.length < 2) {
      // document.getElementById("n").style.animation="none";
      // document.getElementById("n").style.borderBottomColor="#ff073a";
      return false;
    } else {
      // document.getElementById("n").style.borderBottomColor="black";
      // document.getElementById("n").style.animation="blink 3s infinite";
      return true;
    }
  }

  isOpen = (i) => {
    return this.dungeons.dungeons[i].open;
  };

  start() {
    if (this.check()) {
      this.audio.playBackgroundOne();
      this.inGame = true;
    }
  }

  backHome() {
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
    this.audio.stopVillageMusic();
    this.audio.playBackgroundOne();
    setTimeout(() => {
      let assets = document.getElementsByClassName("assets")[0];
      assets.innerHTML = "";
      assets.appendChild(this.images.gold);
      assets.append(this.player.gold.toString());

      document.getElementById("mainBck").style.opacity = "0.8";
      document.getElementById("cont").style.opacity = "1";
    }, 40);
  }

  // DUNGEONS

  goCave(lvl, elite = false) {
    if (this.player.missionTime == -3) {
      let staminaRequired = lvl * lvl + 2;

      if (elite) staminaRequired -= 160;

      if (this.dungeons.dungeons[lvl - 1].open) {
        if (this.player.staminaLeft >= staminaRequired) {
          if (this.player.weapon.state > 0 && this.player.armor.state > 0) {
            this.player.staminaLeft -= staminaRequired;
            this.player.location = "dfight";
            setTimeout(() => {
              this.cave.fight(lvl, elite);
            }, 100);
          } else {
            this.alertOut("Your Weapon or your Armor isn't in good shape");
          }
        } else {
          this.alertOut("You are too exhausted");
        }
      } else {
        this.alertOut("The Dungeon is closed");
      }
    } else {
      this.alertOut("Your currently on a Mission");
    }
  }

  goElites() {
    var mains = document.getElementsByTagName("main") as HTMLCollectionOf<
      HTMLElement
    >;

    if (this.dungeonMode == "elites") {
      mains[1].style.opacity = "0";
      setTimeout(() => {
        this.dungeonMode = "normal";
        mains[0].style.opacity = "1";
      }, 500);
    } else {
      mains[0].style.opacity = "0";
      setTimeout(() => {
        this.dungeonMode = "elites";
        mains[1].style.opacity = "1";
        mains[1].style.display = "block";
      }, 500);
    }

    this.images.map.classList.toggle("elites");
  }

  goToDungeon() {
    this.audio.stopMusicBck();
    this.audio.playDungeonsMusic();
    this.player.location = "dungeons";
    setTimeout(() => {
      document.getElementById("dungeons").style.opacity = "1";
      document.getElementById("dungeons").appendChild(this.images.map);
      document.getElementById("mainBck").style.opacity = "0";
    }, 60);
  }

  getMissionTime(time = 0) {
    let t = time;

    let m = Math.floor(t / 60);
    let s = t % 60;
    let s0 = s.toString();

    if (s < 10) s0 = "0" + s;

    return m + ":" + s0;
  }

  alertOut(input) {
    this.alertInput = input;
    this.showAlert = true;
  }

  damageSub: Subscription;

  alertOff(value) {
    this.showAlert = false;
    if (value === "duel") {
      this.socket.confirm(this.challenger.name);

      this.player.location = "dfight";

      setTimeout(() => {
        this.cave.enemy = this.challenger;
        this.damageSub = this.socket.dmg.subscribe((damage) => {
          if (!this.inFight) {
            this.cave.pvpOn = true;
            this.cave.prepToFight();
            this.cave.enemyTurn(damage);
            this.inFight = true;
          }
        });
      }, 100);
    }
  }

  addCoins(event) {
    if (event.keyCode == 72) {
      this.player.gold += 10;
    }
  }
}
