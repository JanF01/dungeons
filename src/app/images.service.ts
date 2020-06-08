import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ImagesService {
  gold = new Image(715, 715);
  map = new Image(3000, 900);
  village = new Image(2000, 1000);
  blacksmith = new Image(1500, 900);
  bckMain = new Image(1800, 900);
  registerBck = new Image(680, 438);
  hpPotion = new Image(256, 256);
  speedPotion = new Image(256, 256);
  staminaPotion = new Image(256, 256);
  staminaBubble = new Image(343, 377);
  healthBubble = new Image(343, 377);
  speedBubble = new Image(343, 377);
  reveredBubble = new Image(343, 377);
  holyBubble = new Image(343, 377);
  normalBubble = new Image(343, 377);
  legendBubble = new Image(343, 377);
  artefactBubble = new Image(343, 377);
  darkness = new Image(64, 64);
  fire = new Image(64, 64);
  ice = new Image(64, 64);
  missions = new Image(1500, 900);

  constructor() {
    this.map.src = "assets/background/map.jpg";
    this.map.classList.toggle("map");

    this.village.src = "assets/background/village.jpg";
    this.village.classList.toggle("map");
    this.village.classList.toggle("village");

    this.blacksmith.src = "assets/background/armory.jpg";
    this.blacksmith.classList.toggle("map");
    this.blacksmith.classList.toggle("village");

    this.missions.src = "assets/woodenBramka.jpg";
    this.missions.classList.toggle("map");
    this.missions.classList.toggle("village");
    this.missions.classList.toggle("missionb");

    this.bckMain.src = "assets/background/main.jpg";
    this.bckMain.classList.toggle("map");
    this.bckMain.classList.toggle("mainBck");
    this.bckMain.id = "mainBck";

    this.registerBck.src = "assets/background/main.jpg";
    this.registerBck.classList.toggle("map");
    this.registerBck.classList.toggle("mainBck");
    this.registerBck.id = "mainBck";

    this.gold.src = "assets/coins.png";
    this.gold.classList.toggle("coins");

    this.hpPotion.src = "assets/potion/hp.png";
    this.staminaPotion.src = "assets/potion/stamina.png";
    this.speedPotion.src = "assets/potion/speed.png";

    this.hpPotion.classList.toggle("potion");
    this.staminaPotion.classList.toggle("potion");
    this.speedPotion.classList.toggle("potion");

    this.staminaBubble.src = "assets/info/stamina.png";
    this.healthBubble.src = "assets/info/health.png";
    this.speedBubble.src = "assets/info/speed.png";
    this.normalBubble.src = "assets/info/item.png";
    this.legendBubble.src = "assets/info/legend.png";
    this.artefactBubble.src = "assets/info/artefact.png";
    this.holyBubble.src = "assets/info/holy.png";
    this.reveredBubble.src = "assets/info/revered.png";

    this.darkness.src = "assets/perk/darkness.png";
    this.fire.src = "assets/perk/fire.png";
    this.ice.src = "assets/perk/ice.png";
  }

  newHpPotion() {
    return this.hpPotion.cloneNode();
  }
  newStaminaPotion() {
    return this.staminaPotion.cloneNode();
  }
  newSpeedPotion() {
    return this.speedPotion.cloneNode();
  }
}
