import { Injectable } from "@angular/core";
import { Dungeon } from "./dungeons/models/dungeon.model";
import { Enemy } from "./dungeons/models/enemy.model";
import { MoneyBag } from "./dungeons/models/moneyBag.model";
import { Weapon } from "./dungeons/models/items/weapon.model";
import { Armor } from "./dungeons/models/items/armor.model";
import { ImagesService } from "./images.service";
import { Necklace } from "./dungeons/models/items/necklace.model";
import { Ring } from "./dungeons/models/items/ring.model";
import { Crystal } from "./dungeons/models/items/crystal.model";

@Injectable({
  providedIn: "root",
})
export class DungeonsService {
  dungeons: Array<Dungeon> = [];
  elites: Array<Dungeon> = [];
  chance: number = 1;

  names: any = [
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

  constructor(private images: ImagesService) {}

  firstFill(ds, open) {
    this.dungeons.push(
      new Dungeon(
        this.names[0],
        "assets/dungeon/1.png",
        this.fillDungeon(1, ds[0]),
        ds[0],
        open[0],
        0
      )
    );
    this.dungeons.push(
      new Dungeon(
        this.names[1],
        "assets/dungeon/2.png",
        this.fillDungeon(2, ds[1]),
        ds[1],
        open[1],
        0
      )
    );
    this.dungeons.push(
      new Dungeon(
        this.names[2],
        "assets/dungeon/3.png",
        this.fillDungeon(3, ds[2]),
        ds[2],
        open[2],
        0
      )
    );
    this.dungeons.push(
      new Dungeon(
        this.names[3],
        "assets/dungeon/4.png",
        this.fillDungeon(4, ds[3]),
        ds[3],
        open[3],
        0
      )
    );
    this.dungeons.push(
      new Dungeon(
        this.names[4],
        "assets/dungeon/5.png",
        this.fillDungeon(5, ds[4]),
        ds[4],
        open[4],
        0
      )
    );
    this.dungeons.push(
      new Dungeon(
        this.names[5],
        "assets/dungeon/6.png",
        this.fillDungeon(6, ds[5]),
        ds[5],
        open[5],
        0
      )
    );
    this.dungeons.push(
      new Dungeon(
        this.names[6],
        "assets/dungeon/7.png",
        this.fillDungeon(7, ds[6]),
        ds[6],
        open[6],
        0
      )
    );

    this.dungeons.push(
      new Dungeon(
        this.names[7],
        "assets/dungeon/8.png",
        this.fillDungeon(8, ds[7]),
        ds[7],
        open[7],
        0
      )
    );

    this.dungeons.push(
      new Dungeon(
        this.names[8],
        "assets/dungeon/9.png",
        this.fillDungeon(9, ds[8]),
        ds[8],
        open[8],
        0
      )
    );
    this.dungeons.push(
      new Dungeon(
        this.names[9],
        "assets/dungeon/10.png",
        this.fillDungeon(10, ds[9]),
        ds[9],
        open[9],
        0
      )
    );
    this.dungeons.push(
      new Dungeon(
        this.names[10],
        "assets/dungeon/11.png",
        this.fillDungeon(11, ds[10]),
        ds[10],
        open[10],
        0
      )
    );
    this.dungeons.push(
      new Dungeon(
        this.names[11],
        "assets/dungeon/12.png",
        this.fillDungeon(12, ds[11]),
        ds[11],
        open[11],
        0
      )
    );
    this.dungeons.push(
      new Dungeon(
        "Cyclope's Lair",
        "assets/elite/cyclope.png",
        [
          new Enemy(
            "assets/elite/cyclope.png",
            3451,
            "Cyclope",
            this.getDamage(2, 9),
            10,
            this.createLoot(2, 14, 12, true)
          ),
        ],
        0,
        true,
        1
      )
    );
    this.dungeons.push(
      new Dungeon(
        "Ork's Cave",
        "assets/elite/giant_icon.png",
        [
          new Enemy(
            "assets/elite/giant.png",
            11834,
            "Ork",
            this.getDamage(3, 19),
            18,
            this.createLoot(3, 21, 23, true)
          ),
        ],
        0,
        false,
        1
      )
    );
    this.dungeons.push(
      new Dungeon(
        "Giant's Field",
        "assets/elite/giant2_icon.png",
        [
          new Enemy(
            "assets/elite/giant2.png",
            26834,
            "Giant",
            this.getDamage(4, 21),
            25,
            this.createLoot(4, 21, 28, true)
          ),
        ],
        0,
        false,
        1
      )
    );
    this.dungeons.push(
      new Dungeon(
        "Hogward",
        "assets/elite/cerberus_icon.png",
        [
          new Enemy(
            "assets/elite/cerberus.png",
            33834,
            "Cerberus",
            this.getDamage(5, 17),
            29,
            this.createLoot(5, 11, 31, true)
          ),
        ],
        0,
        false,
        1
      )
    );
    this.dungeons.push(
      new Dungeon(
        "Hogward's Office",
        "assets/elite/snake_icon.png",
        [
          new Enemy(
            "assets/elite/snake.png",
            49834,
            "Severus Snake",
            this.getDamage(6, 13),
            33,
            this.createLoot(6, 13, 38, true)
          ),
        ],
        0,
        false,
        1
      )
    );
    this.dungeons.push(
      new Dungeon(
        "Vectra",
        "assets/elite/dragon_icon.png",
        [
          new Enemy(
            "assets/elite/dragon.png",
            68834,
            "Dragonito Reclito",
            this.getDamage(6, 24),
            41,
            this.createLoot(7, 19, 45, true)
          ),
        ],
        0,
        false,
        1
      )
    );
    this.dungeons.push(
      new Dungeon(
        "Hell",
        "assets/elite/death_icon.png",
        [
          new Enemy(
            "assets/elite/death.png",
            86834,
            "Red Death",
            this.getDamage(7, 21),
            51,
            this.createLoot(8, 18, 56, true)
          ),
        ],
        0,
        false,
        1
      )
    );
    this.dungeons.push(
      new Dungeon(
        "Hell",
        "assets/elite/zombie_icon.png",
        [
          new Enemy(
            "assets/elite/zombie.png",
            111333,
            "Dead Body",
            this.getDamage(8, 20),
            60,
            this.createLoot(8, 18, 65, true)
          ),
        ],
        0,
        false,
        1
      )
    );

    for (let i = 0; i < 12; i++) {
      this.dungeons[i].amount = this.dungeons[i].monsters.length;
    }
  }

  getHitPoints(dungeon: number, subdungeon: number) {
    if (dungeon != 1) dungeon *= dungeon + dungeon / 2;

    return Math.round(
      dungeon * subdungeon * Math.random() * 40 + 110 * subdungeon * dungeon
    );
  }
  getDamage(dungeon: number, subdungeon: number) {
    if (dungeon > 5) dungeon *= dungeon / 2;
    else if (dungeon > 8) dungeon *= dungeon;
    else if (dungeon != 1) dungeon *= 2.2;

    return Math.round(dungeon * subdungeon * 1.2 * (Math.random() * 3 + 6));
  }

  createLoot(
    dungeon: number,
    subdungeon: number,
    level: number,
    elite: boolean = false,
    boss: boolean = false
  ) {
    let amount = Math.round(Math.random() * subdungeon * dungeon) + 1;
    if (amount < 2) {
      amount++;
    }
    let loot = [];

    for (let i = amount; i > 0; ) {
      let src, size;
      let coins = 0;
      if (i > 10) {
        coins =
          Math.round(Math.random() * 2 + 4) * 8 +
          Math.round(Math.random() * 0.7) * 20;
        src = "assets/bag/huge.png";
        size = "hugeMoneyBag";
        i -= 10;
      } else {
        coins =
          Math.round(Math.random() * 3 + 1) +
          Math.round(Math.random() * 0.7) * 10;
        if (coins > 10) {
          src = "assets/bag/big.png";
          size = "bigMoneyBag";
        } else {
          src = "assets/bag/small.png";
          size = "smallMoneyBag";
        }
        i--;
      }

      loot.push(new MoneyBag(coins, src, Math.random() * 30 - 15, size));
    }

    let itemChance = Math.random();

    elite
      ? (this.chance = 3)
      : boss
      ? (this.chance = 2.2)
      : (this.chance = 0.5);

    if (itemChance < 0.29 * this.chance) {
      loot.push(
        this.itemDrop(itemChance, dungeon, subdungeon, level, this.chance)
      );
    }

    this.chance = 0.5;

    return loot;
  }

  itemDrop(IC, d, s, lvl, chance) {
    var item;

    let r = Math.round((Math.random() * lvl) / 2) + 1 + d * 3;
    let w = "2_";
    let a = "2_";

    if (d == 1 || d == 3) {
      w = "1_";
      a = "1_";
    }

    if (IC > 0.288 * chance) {
      item = new Crystal(
        0,
        "artefact",
        "Sonic's Crystal",
        "assets/crystal/artefact_speed.png",
        "#00E81",
        "none",
        Math.round(lvl * lvl * 0.6),
        "speed",
        Math.round(lvl / 2),
        Math.random() * 30 - 15,
        "artefact"
      );
    } else if (IC > 0.286 * chance) {
      item = new Crystal(
        0,
        "artefact",
        "Rain of Experience",
        "assets/crystal/artefact_exp.png",
        "#00E82",
        "none",
        Math.round(lvl * lvl * 0.6),
        "exp",
        Math.round(Math.random() * 40 + 40) / 100,
        Math.random() * 30 - 15,
        "artefact"
      );
    } else if (IC > 0.284 * chance) {
      item = new Crystal(
        0,
        "artefact",
        "Crystal of Destruction",
        "assets/crystal/artefact_dmg.png",
        "#00E83",
        "none",
        Math.round(lvl * lvl * 0.6),
        "dmg",
        Math.round(Math.random() * 20 + 25) / 100,
        Math.random() * 30 - 15,
        "artefact"
      );
    } else if (IC > 0.282 * chance) {
      item = new Crystal(
        0,
        "artefact",
        "Life's Crystal",
        "assets/crystal/artefact_hp.png",
        "#00E84",
        "none",
        Math.round(lvl * lvl * 0.6),
        "hp",
        Math.round(Math.random() * 20 + 25) / 100,
        Math.random() * 30 - 15,
        "artefact"
      );
    } else if (IC > 0.278 * chance) {
      item = new Crystal(
        0,
        "legend",
        "Velocity Crystal",
        "assets/crystal/legend_speed.png",
        "#00E61",
        "none",
        Math.round(lvl * lvl * 0.4),
        "speed",
        Math.round(lvl / 2.6),
        Math.random() * 30 - 15,
        "legend"
      );
    } else if (IC > 0.274 * chance) {
      item = new Crystal(
        0,
        "legend",
        "Experience Multiplier",
        "assets/crystal/legend_exp.png",
        "#00E62",
        "none",
        Math.round(lvl * lvl * 0.4),
        "exp",
        Math.round(Math.random() * 30 + 20) / 100,
        Math.random() * 30 - 15,
        "legend"
      );
    } else if (IC > 0.27 * chance) {
      item = new Crystal(
        0,
        "legend",
        "Power Crystal",
        "assets/crystal/legend_dmg.png",
        "#00E63",
        "none",
        Math.round(lvl * lvl * 0.4),
        "dmg",
        Math.round(Math.random() * 15 + 15) / 100,
        Math.random() * 30 - 15,
        "legend"
      );
    } else if (IC > 0.266 * chance) {
      item = new Crystal(
        0,
        "legend",
        "Health Stream",
        "assets/crystal/legend_hp.png",
        "#00E64",
        "none",
        Math.round(lvl * lvl * 0.4),
        "hp",
        Math.round(Math.random() * 15 + 15) / 100,
        Math.random() * 30 - 15,
        "legend"
      );
    } else if (IC > 0.259 * chance) {
      item = new Crystal(
        0,
        "normal",
        "Speed Gem",
        "assets/crystal/normal_speed.png",
        "#00E11",
        "none",
        Math.round(lvl * lvl * 0.2),
        "speed",
        Math.round(lvl / 3),
        Math.random() * 30 - 15,
        "normal"
      );
    } else if (IC > 0.252 * chance) {
      item = new Crystal(
        0,
        "normal",
        "Crystal Of Experience",
        "assets/crystal/normal_exp.png",
        "#00E12",
        "none",
        Math.round(lvl * lvl * 0.2),
        "exp",
        Math.round(Math.random() * 20 + 5) / 100,
        Math.random() * 30 - 15,
        "normal"
      );
    } else if (IC > 0.245 * chance) {
      item = new Crystal(
        0,
        "normal",
        "Damage Crystal",
        "assets/crystal/normal_dmg.png",
        "#00E13",
        "none",
        Math.round(lvl * lvl * 0.2),
        "dmg",
        Math.round(Math.random() * 10 + 8) / 100,
        Math.random() * 30 - 15,
        "normal"
      );
    } else if (IC > 0.238 * chance) {
      item = new Crystal(
        0,
        "normal",
        "Endurance Gem",
        "assets/crystal/normal_hp.png",
        "#00E14",
        "none",
        Math.round(lvl * lvl * 0.2),
        "hp",
        Math.round(Math.random() * 10 + 8) / 100,
        Math.random() * 30 - 15,
        "normal"
      );
    } else if (IC > 0.13 * chance) {
      if (chance == 3 && IC > 0.233 * chance) {
        item = new Weapon(
          0,
          "revered",
          "The Sword of Napoleon",
          "assets/weapon/" + w + "2.png",
          "#00A82",
          "darknessice",
          Math.round(lvl * lvl * 1.2),
          Math.round(lvl * 16.5) / 10 + r,
          Math.round(lvl * 16.5) / 10 + r + Math.round(lvl / 2.5) + lvl,
          100,
          Math.random() * 30 - 15,
          "revered"
        );
      } else if (chance == 3 && IC > 0.228 * chance) {
        item = new Armor(
          0,
          "revered",
          "The Armor of Napoleon",
          "assets/armor/" + w + "2.png",
          "#00A42",
          "none",
          Math.round(lvl * lvl),
          Math.round(lvl * lvl * 1.2) + r + 70,
          15 + Math.round(Math.random() * 20),
          100,
          Math.random() * 30 - 15,
          "revered"
        );
      } else if (chance == 3 && IC > 0.225 * chance) {
        item = new Weapon(
          0,
          "holy",
          "The Needle of Ascension",
          "assets/weapon/" + w + "3.png",
          "#00A72",
          "fireicedarkness",
          Math.round(lvl * lvl * 1.2),
          Math.round(lvl * 16.5) / 10 + r,
          Math.round(lvl * 16.5) / 10 + r + Math.round(lvl / 2.4) + lvl,
          100,
          Math.random() * 30 - 15,
          "holy"
        );
      } else if (chance == 3 && IC > 0.222 * chance) {
        item = new Armor(
          0,
          "holy",
          "Armor of Zeus",
          "assets/armor/" + w + "3.png",
          "#00A72",
          "fireicedarkness",
          Math.round(lvl * lvl * 1.2),
          Math.round(lvl * lvl * 1.3) + r + 70,
          17 + Math.round(Math.random() * 22),
          100,
          Math.random() * 30 - 15,
          "holy"
        );
      } else if (chance == 3 && IC > 0.22 * chance) {
        item = new Necklace(
          0,
          "revered",
          "Necklace of Poseidon",
          "assets/necklace/1_2.png",
          "#00C32",
          "fireice",
          Math.round(lvl * lvl * 1.4),
          lvl * 11,
          Math.round(Math.random() * 2 + 19) / 100,
          Math.random() * 30 - 15,
          "revered"
        );
      } else if (chance == 3 && IC > 0.218 * chance) {
        item = new Ring(
          0,
          "revered",
          "Ring of Persefona",
          "assets/ring/1_2.png",
          "#00D21",
          "darknessice",
          Math.round(lvl * lvl * 1.4),
          lvl * 11,
          Math.round(Math.random() * 30 + 150) / 100,
          Math.random() * 30 - 15,
          "revered"
        );
      } else if (chance == 3 && IC > 0.217 * chance) {
        item = new Ring(
          0,
          "holy",
          "End Ring",
          "assets/ring/1_2.png",
          "#00D51",
          "fireicedarkness",
          Math.round(lvl * lvl * 1.5),
          lvl * 14,
          Math.round(Math.random() * 40 + 160) / 100,
          Math.random() * 30 - 15,
          "holy"
        );
      } else if (chance == 3 && IC > 0.216 * chance) {
        item = new Necklace(
          0,
          "holy",
          "End Necklace",
          "assets/necklace/1_2.png",
          "#00C42",
          "fireice",
          Math.round(lvl * lvl * 1.5),
          lvl * 14,
          Math.round(Math.random() * 3 + 20) / 100,
          Math.random() * 30 - 15,
          "holy"
        );
      } else {
        item = new Weapon(
          0,
          "normal",
          "A Fricking Sword",
          "assets/weapon/" + w + "1.png",
          "#00A11",
          "none",
          Math.round(lvl * lvl * 0.4),
          Math.round(lvl * 12) / 10 + r,
          Math.round(lvl * 12) / 10 + r + Math.round(lvl / 4.5),
          100,
          Math.random() * 30 - 15,
          "normal"
        );
      }
    } else if (IC > 0.08 * chance) {
      item = new Armor(
        0,
        "normal",
        "Shield Yourself",
        "assets/armor/" + a + "1.png",
        "#00B12",
        "none",
        Math.round(lvl * lvl * 0.4),
        Math.round((lvl * lvl) / 2) + r + 30,
        5 + Math.round(Math.random() * 5),
        100,
        Math.random() * 30 - 15,
        "normal"
      );
    } else if (IC > 0.05 * chance) {
      item = new Weapon(
        0,
        "legend",
        "Holy Sword",
        "assets/weapon/" + w + "2.png",
        "#00A42",
        "fire",
        Math.round(lvl * lvl * 0.7) + 40,
        Math.round(lvl * 14) / 10 + r,
        Math.round(lvl * 14) / 10 + r + Math.round(lvl / 3),
        100,
        Math.random() * 30 - 15,
        "legend"
      );
    } else if (IC > 0.045 * chance) {
      item = new Armor(
        0,
        "legend",
        "Holy Armor",
        "assets/armor/" + a + "2.png",
        "#00B43",
        "none",
        Math.round(lvl * lvl * 0.7),
        Math.round((lvl * lvl) / 1.4) + r + 50,
        10 + Math.round(Math.random() * 10),
        100,
        Math.random() * 30 - 15,
        "legend"
      );
    } else if (IC > 0.04 * chance) {
      item = new Weapon(
        0,
        "artefact",
        "Lucky Needle",
        "assets/weapon/" + w + "3.png",
        "#00A02",
        "darkness",
        Math.round(lvl * lvl),
        Math.round(lvl * 16) / 10 + r,
        Math.round(lvl * 16) / 10 + r + Math.round(lvl / 2.5) + lvl,
        100,
        Math.random() * 30 - 15,
        "artefact"
      );
    } else if (IC > 0.042 * chance) {
      item = new Armor(
        0,
        "artefact",
        "Foreknowing Armor AI",
        "assets/armor/" + a + "3.png",
        "#00B01",
        "none",
        Math.round(lvl * lvl),
        Math.round(lvl * lvl) + r + 70,
        10 + Math.round(Math.random() * 20),
        100,
        Math.random() * 30 - 15,
        "artefact"
      );
    } else if (IC > 0.027 * chance) {
      item = new Necklace(
        0,
        "normal",
        "Necklace of Wisdom",
        "assets/necklace/1_1.png",
        "#00C01",
        "none",
        Math.round(lvl * lvl),
        lvl * 4,
        Math.round(Math.random() * 8 + 2) / 100,
        Math.random() * 30 - 15,
        "normal"
      );
    } else if (IC > 0.014 * chance) {
      item = new Ring(
        0,
        "normal",
        "Ring of Wisdom",
        "assets/ring/1_1.png",
        "#00D01",
        "none",
        Math.round(lvl * lvl),
        lvl * 4,
        Math.round(Math.random() * 35 + 25) / 100,
        Math.random() * 30 - 15,
        "normal"
      );
    } else if (IC > 0.009 * chance) {
      item = new Necklace(
        0,
        "legend",
        "Necklace on Fire",
        "assets/necklace/1_2.png",
        "#00C02",
        "fire",
        Math.round(lvl * lvl * 1.2),
        lvl * 6,
        Math.round(Math.random() * 8 + 8) / 100,
        Math.random() * 30 - 15,
        "legend"
      );
    } else if (IC > 0.004 * chance) {
      item = new Ring(
        0,
        "legend",
        "Ring of Darkness",
        "assets/ring/1_2.png",
        "#00D02",
        "ice",
        Math.round(lvl * lvl * 1.2),
        lvl * 6,
        Math.round(Math.random() * 50 + 50) / 100,
        Math.random() * 30 - 15,
        "legend"
      );
    } else if (IC > 0.002 * chance) {
      item = new Necklace(
        0,
        "artefact",
        "Necklace 1/500",
        "assets/necklace/1_2.png",
        "#00C03",
        "darknessice",
        Math.round(lvl * lvl * 1.3),
        lvl * 9,
        Math.round(Math.random() * 10 + 10) / 100,
        Math.random() * 30 - 15,
        "artefact"
      );
    } else if (IC <= 0.002 * chance) {
      item = new Ring(
        0,
        "artefact",
        "Ring 1/500",
        "assets/ring/1_2.png",
        "#00D03",
        "fireice",
        Math.round(lvl * lvl * 1.3),
        lvl * 9,
        Math.round(Math.random() * 100 + 75) / 100,
        Math.random() * 30 - 15,
        "artefact"
      );
    }

    return item;
  }

  monsters = [
    //Loch 1

    [
      "assets/monster/1_1.png",
      "Glimmerini Aksmano",
      "assets/monster/1_2.png",
      "Glimmerini Simp",
      "assets/monster/1_3.png",
      "Glimmerinio Aksmanito",
      "assets/monster/1_6.png",
      "Mazgor",
      "assets/monster/1_9.png",
      "Wóda",
      "assets/monster/1_8.png",
      "Małpka",
      "assets/monster/1_3.png",
      "Glimmer v2",
      "assets/monster/1_7.png",
      "Devil Child",
      "assets/monster/1_5.png",
      "Glimmer Alpha Man",
      "assets/monster/1_4.png",
      "Glimmer Alpha +1",
      "assets/monster/2_5.png",
      "Mazgor Pasja Programowanie",
      "assets/monster/2_1.png",
      "Moving Dumpling",
      "assets/monster/1_10B.jpg",
      "Oktikk",
    ],

    //Loch 2

    [
      "assets/monster/2_1.png",
      "Moving Dumpling",
      "assets/monster/2_4.png",
      "III Eyed Freak",
      "assets/monster/2_2.png",
      "Talking Dumpling",
      "assets/monster/1_6.png",
      "Mazgor II",
      "assets/monster/1_9.png",
      "Wóda",
      "assets/monster/1_8.png",
      "Małpka",
      "assets/monster/2_3.png",
      "Pissed Of Dumpling",
      "assets/monster/1_4.png",
      "Glimmer Alpha",
      "assets/monster/2_5.png",
      "Mazgor Tiny",
      "assets/monster/1_4.png",
      "Glimmer Alpha +1",
      "assets/monster/2_6.png",
      "Mazgor Elite",
      "assets/monster/2_7.png",
      "???",
      "assets/monster/2_8B.png",
      "Mazgori Cesar",
    ],

    //Loch 3

    [
      "assets/monster/2_1.png",
      "Moving Dumpling",
      "assets/monster/2_4.png",
      "III Eyed Freak",
      "assets/monster/2_2.png",
      "Talking Dumpling",
      "assets/monster/1_6.png",
      "Mazgor II",
      "assets/monster/1_9.png",
      "Wóda",
      "assets/monster/1_8.png",
      "Małpka",
      "assets/monster/2_3.png",
      "Pissed Of Dumpling",
      "assets/monster/1_4.png",
      "Glimmer Alpha",
      "assets/monster/1_5.png",
      "Glimmer Alpha Man",
      "assets/monster/1_4.png",
      "Glimmer Alpha +1",
      "assets/monster/1_5.png",
      "Glimmer Pasja Programowanie",
      "assets/monster/1_5.png",
      "Glimmer Alpha++",
      "assets/monster/1_10B.jpg",
      "Oktikk",
    ],

    //Loch 4

    [
      "assets/monster/2_1.png",
      "Moving Dumpling",
      "assets/monster/2_4.png",
      "III Eyed Freak",
      "assets/monster/2_2.png",
      "Talking Dumpling",
      "assets/monster/1_6.png",
      "Mazgor II",
      "assets/monster/1_9.png",
      "Wóda",
      "assets/monster/1_8.png",
      "Małpka",
      "assets/monster/2_3.png",
      "Pissed Of Dumpling",
      "assets/monster/1_4.png",
      "Glimmer Alpha",
      "assets/monster/1_5.png",
      "Glimmer Alpha Man",
      "assets/monster/1_4.png",
      "Glimmer Alpha +1",
      "assets/monster/1_5.png",
      "Glimmer Pasja Programowanie",
      "assets/monster/1_5.png",
      "Glimmer Alpha++",
      "assets/monster/1_10B.jpg",
      "Oktikk",
    ],

    //Loch 5

    [
      "assets/monster/2_1.png",
      "Moving Dumpling",
      "assets/monster/2_4.png",
      "III Eyed Freak",
      "assets/monster/2_2.png",
      "Talking Dumpling",
      "assets/monster/1_6.png",
      "Mazgor II",
      "assets/monster/1_9.png",
      "Wóda",
      "assets/monster/1_8.png",
      "Małpka",
      "assets/monster/2_3.png",
      "Pissed Of Dumpling",
      "assets/monster/1_4.png",
      "Glimmer Alpha",
      "assets/monster/1_5.png",
      "Glimmer Alpha Man",
      "assets/monster/1_4.png",
      "Glimmer Alpha +1",
      "assets/monster/1_5.png",
      "Glimmer Pasja Programowanie",
      "assets/monster/1_5.png",
      "Glimmer Alpha++",
      "assets/monster/1_10B.jpg",
      "Oktikk",
    ],

    //Loch 6

    [
      "assets/monster/2_1.png",
      "Moving Dumpling",
      "assets/monster/2_4.png",
      "III Eyed Freak",
      "assets/monster/2_2.png",
      "Talking Dumpling",
      "assets/monster/1_6.png",
      "Mazgor II",
      "assets/monster/1_9.png",
      "Wóda",
      "assets/monster/1_8.png",
      "Małpka",
      "assets/monster/2_3.png",
      "Pissed Of Dumpling",
      "assets/monster/1_4.png",
      "Glimmer Alpha",
      "assets/monster/1_5.png",
      "Glimmer Alpha Man",
      "assets/monster/1_4.png",
      "Glimmer Alpha +1",
      "assets/monster/1_5.png",
      "Glimmer Pasja Programowanie",
      "assets/monster/1_5.png",
      "Glimmer Alpha++",
      "assets/monster/1_10B.jpg",
      "Oktikk",
    ],

    //Loch 7

    [
      "assets/monster/2_1.png",
      "Moving Dumpling",
      "assets/monster/2_4.png",
      "III Eyed Freak",
      "assets/monster/2_2.png",
      "Talking Dumpling",
      "assets/monster/1_6.png",
      "Mazgor II",
      "assets/monster/1_9.png",
      "Wóda",
      "assets/monster/1_8.png",
      "Małpka",
      "assets/monster/2_3.png",
      "Pissed Of Dumpling",
      "assets/monster/1_4.png",
      "Glimmer Alpha",
      "assets/monster/1_5.png",
      "Glimmer Alpha Man",
      "assets/monster/1_4.png",
      "Glimmer Alpha +1",
      "assets/monster/1_5.png",
      "Glimmer Pasja Programowanie",
      "assets/monster/1_5.png",
      "Glimmer Alpha++",
      "assets/monster/1_10B.jpg",
      "Oktikk",
    ],
    //Loch 8

    [
      "assets/monster/2_1.png",
      "Moving Dumpling",
      "assets/monster/2_4.png",
      "III Eyed Freak",
      "assets/monster/2_2.png",
      "Talking Dumpling",
      "assets/monster/1_6.png",
      "Mazgor II",
      "assets/monster/1_9.png",
      "Wóda",
      "assets/monster/1_8.png",
      "Małpka",
      "assets/monster/2_3.png",
      "Pissed Of Dumpling",
      "assets/monster/1_4.png",
      "Glimmer Alpha",
      "assets/monster/1_5.png",
      "Glimmer Alpha Man",
      "assets/monster/1_4.png",
      "Glimmer Alpha +1",
      "assets/monster/1_5.png",
      "Glimmer Pasja Programowanie",
      "assets/monster/1_5.png",
      "Glimmer Alpha++",
      "assets/monster/1_10B.jpg",
      "Oktikk",
    ],

    //Loch 9

    [
      "assets/monster/2_1.png",
      "Moving Dumpling",
      "assets/monster/2_4.png",
      "III Eyed Freak",
      "assets/monster/2_2.png",
      "Talking Dumpling",
      "assets/monster/1_6.png",
      "Mazgor II",
      "assets/monster/1_9.png",
      "Wóda",
      "assets/monster/1_8.png",
      "Małpka",
      "assets/monster/2_3.png",
      "Pissed Of Dumpling",
      "assets/monster/1_4.png",
      "Glimmer Alpha",
      "assets/monster/1_5.png",
      "Glimmer Alpha Man",
      "assets/monster/1_4.png",
      "Glimmer Alpha +1",
      "assets/monster/1_5.png",
      "Glimmer Pasja Programowanie",
      "assets/monster/1_5.png",
      "Glimmer Alpha++",
      "assets/monster/1_10B.jpg",
      "Oktikk",
    ],

    //Loch 10

    [
      "assets/monster/2_1.png",
      "Moving Dumpling",
      "assets/monster/2_4.png",
      "III Eyed Freak",
      "assets/monster/2_2.png",
      "Talking Dumpling",
      "assets/monster/1_6.png",
      "Mazgor II",
      "assets/monster/1_9.png",
      "Wóda",
      "assets/monster/1_8.png",
      "Małpka",
      "assets/monster/2_3.png",
      "Pissed Of Dumpling",
      "assets/monster/1_4.png",
      "Glimmer Alpha",
      "assets/monster/1_5.png",
      "Glimmer Alpha Man",
      "assets/monster/1_4.png",
      "Glimmer Alpha +1",
      "assets/monster/1_5.png",
      "Glimmer Pasja Programowanie",
      "assets/monster/1_5.png",
      "Glimmer Alpha++",
      "assets/monster/1_10B.jpg",
      "Oktikk",
    ],

    //Loch 11

    [
      "assets/monster/2_1.png",
      "Moving Dumpling",
      "assets/monster/2_4.png",
      "III Eyed Freak",
      "assets/monster/2_2.png",
      "Talking Dumpling",
      "assets/monster/1_6.png",
      "Mazgor II",
      "assets/monster/1_9.png",
      "Wóda",
      "assets/monster/1_8.png",
      "Małpka",
      "assets/monster/2_3.png",
      "Pissed Of Dumpling",
      "assets/monster/1_4.png",
      "Glimmer Alpha",
      "assets/monster/1_5.png",
      "Glimmer Alpha Man",
      "assets/monster/1_4.png",
      "Glimmer Alpha +1",
      "assets/monster/1_5.png",
      "Glimmer Pasja Programowanie",
      "assets/monster/1_5.png",
      "Glimmer Alpha++",
      "assets/monster/1_10B.jpg",
      "Oktikk",
    ],
    //Loch 12

    [
      "assets/monster/2_1.png",
      "Moving Dumpling",
      "assets/monster/2_4.png",
      "III Eyed Freak",
      "assets/monster/2_2.png",
      "Talking Dumpling",
      "assets/monster/1_6.png",
      "Mazgor II",
      "assets/monster/1_9.png",
      "Wóda",
      "assets/monster/1_8.png",
      "Małpka",
      "assets/monster/2_3.png",
      "Pissed Of Dumpling",
      "assets/monster/1_4.png",
      "Glimmer Alpha",
      "assets/monster/1_5.png",
      "Glimmer Alpha Man",
      "assets/monster/1_4.png",
      "Glimmer Alpha +1",
      "assets/monster/1_5.png",
      "Glimmer Pasja Programowanie",
      "assets/monster/1_5.png",
      "Glimmer Alpha++",
      "assets/monster/1_10B.jpg",
      "Oktikk",
    ],
  ];

  fillDungeon(dungeon, min = 0) {
    var monsterArray: Array<Enemy> = [];
    var amount = Math.round(Math.random() * 12 + 10);

    if (amount < min) {
      amount = min + 2;
    }

    for (let i = 0; i <= amount; i++) {
      let addLvl = Math.round((Math.random() * i) / 3 + i / 3);

      if (i == amount) {
        // BOSS

        monsterArray.push(
          new Enemy(
            this.monsters[dungeon - 1][
              (this.monsters[dungeon - 1].length / 2 - 1) * 2
            ],
            this.getHitPoints(dungeon, i + 1),
            this.monsters[dungeon - 1][
              (this.monsters[dungeon - 1].length / 2 - 1) * 2 + 1
            ],
            this.getDamage(dungeon, i + 1),
            dungeon * dungeon + addLvl,
            this.createLoot(
              dungeon,
              i + 1,
              dungeon * dungeon + addLvl,
              false,
              true
            )
          )
        );
      } else {
        // Enemys

        let r = Math.round(
          Math.random() * (this.monsters[dungeon - 1].length / 2 - 2)
        );

        monsterArray.push(
          new Enemy(
            this.monsters[dungeon - 1][r * 2],
            this.getHitPoints(dungeon, i + 1),
            this.monsters[dungeon - 1][r * 2 + 1],
            this.getDamage(dungeon, i + 1),
            dungeon * dungeon + addLvl,
            this.createLoot(dungeon, i + 1, dungeon * dungeon + addLvl)
          )
        );
      }
    }

    return monsterArray;
  }

  reFillDungeon(dungeon) {
    this.dungeons[dungeon].monsters = this.fillDungeon(dungeon + 1);

    this.dungeons[dungeon].amount = this.dungeons[dungeon].monsters.length;
  }

  reFillElite(elite) {
    switch (elite) {
      case 0:
        this.dungeons[elite + 12].monsters = [
          new Enemy(
            "assets/elite/cyclope.png",
            3451,
            "Cyclope",
            this.getDamage(2, 9),
            10,
            this.createLoot(2, 14, 12, true)
          ),
        ];
        break;
      case 1:
        this.dungeons[elite + 12].monsters = [
          new Enemy(
            "assets/elite/giant.png",
            11834,
            "Ork",
            this.getDamage(3, 21),
            19,
            this.createLoot(3, 21, 23, true)
          ),
        ];
        break;
      case 2:
        this.dungeons[elite + 12].monsters = [
          new Enemy(
            "assets/elite/giant2.png",
            29834,
            "Giant",
            this.getDamage(4, 21),
            25,
            this.createLoot(4, 21, 28, true)
          ),
        ];
        break;
      case 3:
        this.dungeons[elite + 12].monsters = [
          new Enemy(
            "assets/elite/cerberus.png",
            39834,
            "Cerberus",
            this.getDamage(5, 17),
            29,
            this.createLoot(5, 11, 31, true)
          ),
        ];
        break;
      case 4:
        this.dungeons[elite + 12].monsters = [
          new Enemy(
            "assets/elite/snake.png",
            53834,
            "Severus Snake",
            this.getDamage(6, 13),
            33,
            this.createLoot(6, 13, 38, true)
          ),
        ];
        break;
      case 5:
        this.dungeons[elite + 12].monsters = [
          new Enemy(
            "assets/elite/dragon.png",
            68834,
            "Dragonito Reclito",
            this.getDamage(6, 24),
            41,
            this.createLoot(7, 19, 45, true)
          ),
        ];
        break;
      case 6:
        this.dungeons[elite + 12].monsters = [
          new Enemy(
            "assets/elite/death.png",
            86834,
            "Red Death",
            this.getDamage(7, 21),
            51,
            this.createLoot(8, 18, 56, true)
          ),
        ];
        break;
      case 7:
        this.dungeons[elite + 12].monsters = [
          new Enemy(
            "assets/elite/zombie.png",
            86834,
            "Dead Body",
            this.getDamage(8, 22),
            60,
            this.createLoot(8, 18, 65, true)
          ),
        ];
        break;
    }

    if (this.dungeons[elite + 13]) {
      this.dungeons[elite + 13].open = true;
    }
  }
}
