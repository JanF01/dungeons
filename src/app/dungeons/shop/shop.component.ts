import { Component, OnInit,Input } from '@angular/core';
import { User } from '../models/user.model';
import { Potion } from '../models/potion.model';
import { ImagesService } from '../../images.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @Input("user") player: User;



  constructor( private images:ImagesService){ 
   

    this.images.hpPotion.onclick = () => { this.buyHpPotion(600); }
    this.images.staminaPotion.onclick = () => { this.buyStaminaPotion(10); }
    this.images.speedPotion.onclick = () => { this.buySpeedPotion(2); }
  }

  ngOnInit(): void {
  }

  backHome(){
      this.player.location="home";
  }

  buyHpPotion(size){
     if(this.player.gold>=10){
       this.player.gold-=10;
       this.player.health+=size;
       if(this.player.hitPoints<this.player.health) this.player.health=this.player.hitPoints;
     }
  }
   buyStaminaPotion(size){
     if(this.player.gold>=10){
       this.player.gold-=10;
       this.player.stamina+=size;
     }
  }
   buySpeedPotion(size){
     if(this.player.gold>=10){
       this.player.gold-=10;
       this.player.speed+=2;
     }
  }

  showPotions(){
    let potions = document.getElementsByClassName("item") as HTMLCollectionOf<HTMLElement>;
    potions[0].insertBefore(this.images.hpPotion,potions[0].firstChild);
    potions[1].insertBefore(this.images.staminaPotion,potions[1].firstChild);
    potions[2].insertBefore(this.images.speedPotion,potions[2].firstChild);
    setTimeout(()=>{
      document.getElementById('shop').style.opacity="1";
     },40);
  }

}
