import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  gold = new Image(715,715);
  map = new Image(3000,900);
  hpPotion = new Image(256,256);
  speedPotion = new Image(256,256);
  staminaPotion = new Image(256,256);

  constructor() {
     this.map.src = "assets/map.jpg";
     this.map.classList.toggle("map");

     this.gold.src="assets/coins.png";
     this.gold.classList.toggle("coins");

     this.hpPotion.src="assets/hpPotion.png";
     this.staminaPotion.src="assets/staminaPotion.png";
     this.speedPotion.src="assets/speedPotion.png";
 
     this.hpPotion.classList.toggle("potion");
     this.staminaPotion.classList.toggle("potion");
     this.speedPotion.classList.toggle("potion");
 
   }
}
