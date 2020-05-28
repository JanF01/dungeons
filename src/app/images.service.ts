import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  gold = new Image(715,715);
  map = new Image(3000,900);
  bckMain = new Image(1800,900);
  hpPotion = new Image(256,256);
  speedPotion = new Image(256,256);
  staminaPotion = new Image(256,256);
  staminaBubble = new Image(343,377);
  healthBubble = new Image(343,377);
  speedBubble = new Image(343,377);
  normalBubble = new Image(343,377);
  legendBubble = new Image(343,377);
  artefactBubble = new Image(343,377);
  darkness = new Image(64,64);
  fire = new Image(64,64);
  ice = new Image(64,64);
  



  constructor() {
     this.map.src = "assets/map.jpg";
     this.map.classList.toggle("map");

     this.bckMain.src = "assets/bckMain.jpg";
     this.bckMain.classList.toggle("map");
     this.bckMain.classList.toggle("mainBck");
     this.bckMain.id="mainBck";

     this.gold.src="assets/coins.png";
     this.gold.classList.toggle("coins");

     this.hpPotion.src="assets/hpPotion.png";
     this.staminaPotion.src="assets/staminaPotion.png";
     this.speedPotion.src="assets/speedPotion.png";
 
     this.hpPotion.classList.toggle("potion");
     this.staminaPotion.classList.toggle("potion");
     this.speedPotion.classList.toggle("potion");


     this.staminaBubble.src = "assets/staminaPotionInfo.png";
     this.healthBubble.src = "assets/healthPotionInfo.png";
     this.speedBubble.src = "assets/speedPotionInfo.png";
     this.normalBubble.src = "assets/itemInfo.png";
     this.legendBubble.src = "assets/legendItemInfo.png";
     this.artefactBubble.src = "assets/artefactItemInfo.png";

     this.darkness.src = "assets/darkness.png";
     this.fire.src = "assets/firePerk.png";
     this.ice.src = "assets/snow.png";
   }


   newHpPotion(){

     return this.hpPotion.cloneNode();
   }
   newStaminaPotion(){

    return this.staminaPotion.cloneNode();
  }
  newSpeedPotion(){

    return this.speedPotion.cloneNode();
  }
}
