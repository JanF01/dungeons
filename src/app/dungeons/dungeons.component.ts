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
import { Item } from "./models/item.model";
import { Armor } from "./models/items/armor.model";
import { Weapon } from "./models/items/weapon.model";
import { Necklace } from "./models/items/necklace.model";
import { Ring } from "./models/items/ring.model";
import { VillageComponent } from "./village/village.component";
import { Crystal } from "./models/items/crystal.model";

@Component({
  selector: "app-dungeons",
  templateUrl: "./dungeons.component.html",
  styleUrls: ["./dungeons.component.scss"],
})
export class DungeonsComponent implements OnInit {
  name: string = "Janke";
  inGame: boolean = true;
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

  ngOnInit() {
    this.start();
  }

  constructor(
    private audio: AudioService,
    private dungeons: DungeonsService,
    private images: ImagesService
  ) {
    this.player = {
      name: this.name,
      level: 1,
      exp: 0,
      expMulti: 1,
      nextExp: 782,
      gold: 20,
      basePoints: [0, 0, 0, 0, 0],
      strength: 7,
      damage: 21,
      hitPoints: 956,
      health: 956,
      stamina: 200032,
      staminaLeft: 200032,
      speed: 3,
      speedBuildUp: 0,
      luck: 0,
      location: "home",
      dungeon: 0,
      subdungeon: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      goldInSack: 0,
      graphic: "assets/player/knight_blue_plus.png",
      weapon: new Weapon(
        "normal",
        "Dagger",
        "assets/weapon/1_1.png",
        "#00A9A",
        "none",
        15,
        3.5,
        4.5,
        0
      ),
      armor: new Armor(
        "normal",
        "Feeble Armor",
        "assets/armor/1_1.png",
        "#00B11",
        "none",
        10,
        39,
        10,
        100
      ),
      necklace: new Necklace(
        "normal",
        "Rat's Collar",
        "assets/necklace/1_1.png",
        "#00C01",
        "fire",
        21,
        15,
        0.06
      ),
      ring: new Ring(
        "normal",
        "Rat's Collar",
        "assets/ring/1_1.png",
        "#00C01",
        "none",
        33,
        10,
        0.3
      ),
      potions: [
        new Potion("Health I", images.hpPotion, "hp", 600, "HP Potion"),
      ],
      items: [
        new Weapon(
          "revered",
          "Dagger",
          "assets/weapon/swordDev.png",
          "#00A54",
          "fireicedarkness",
          15,
          3500,
          4500,
          100
        ),
        new Armor(
          "holy",
          "Fricking Holy Armor",
          "assets/armor/2_1.png",
          "#00B19",
          "none",
          673345,
          39054,
          50,
          100
        ),
        new Armor(
          "holy",
          "Fricking Holy Armor",
          "assets/armor/2_1.png",
          "#00B19",
          "none",
          673345,
          39054,
          50,
          100
        ),
        new Crystal(
          "artefact",
          "Life's Crystal",
          "assets/crystal/artefact_hp.png",
          "#00E84",
          "none",
          Math.round(2 * 2 * 0.6),
          "hp",
          Math.round(Math.random() * 20 + 25) / 100,
          Math.random() * 30 - 15,
          "artefact"
        ),
      ],
      itemsOnHold: [],
      loot: [],
      weaponsInShop: [
        new Weapon(
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

    this.player.stamina +=
      this.player.necklace.stamina + this.player.ring.stamina;

    this.player.staminaLeft +=
      this.player.necklace.stamina + this.player.ring.stamina;

    setTimeout(() => {
      this.mainBck = this.images.bckMain;

      document.getElementById("cont").style.opacity = "1";

      let assets = document.getElementsByClassName("assets")[0];

      assets.appendChild(this.images.gold);
      assets.append(this.player.gold.toString());
    }, 10);
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
  alertOff() {
    this.showAlert = false;
  }
}
