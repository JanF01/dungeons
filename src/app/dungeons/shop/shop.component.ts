import { Component, OnInit,Input } from '@angular/core';
import { User } from '../models/user.model';
import { Potion } from '../models/potion.model';
import { ImagesService } from '../../images.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @Input("user") player: User;

  potionPos = [
    {x:0,y:0},
    {x:0,y:0},
    {x:0,y:0}
  ];
  posspeed = {x:0,y:0};
  posstamina = {x:0,y:0};


  constructor( private images:ImagesService){ 
   

  }

  ngOnInit(): void {
  }

  showCost(n){
     document.getElementById("cost"+n).style.opacity="1";
  }
  hideCost(n){
    document.getElementById("cost"+n).style.opacity="0";
  }

  backHome(){
    this.player.location="home";

    setTimeout(()=>{
      document.getElementById("cont").style.opacity = "1";
      let mBck = document.getElementsByClassName('mainBck') as HTMLCollectionOf<HTMLElement>;
      mBck[0].style.opacity='0.8';

      let assets = document.getElementsByClassName('assets')[0];
    assets.innerHTML="";
    assets.appendChild(this.images.gold);
    assets.append(this.player.gold.toString());
    },10);
 
  }



  checkIfBought(p,n){
    var potion = document.getElementById(p).getBoundingClientRect();

    let backpack = document.getElementsByClassName('backpack') as HTMLCollectionOf<HTMLElement>;
    let width = window.innerWidth;
    var rect = backpack[0].getBoundingClientRect(); 
    if(potion.x<=rect.x+width*0.8 && potion.x>rect.x+width/16 && potion.y>=rect.y-width/25 && potion.y<rect.y+width/35){
      return true;
     }
     else{
      this.potionPos[n] = {x:0,y:0};
      return false;
    }
  }

  buyHpPotion(size,$event: CdkDragEnd){

    let items = document.getElementsByClassName('item') as HTMLCollectionOf<HTMLElement>;
    items[0].style.cursor="grab";

    if(this.checkIfBought("hp",0)){
      if(this.player.gold>=10){
        if(this.player.items.length<8){
        this.player.gold-=10;
        let potion = this.images.newHpPotion() as HTMLImageElement;
        potion.classList.toggle("potionInBackpack");

        this.player.items.push(new Potion(potion,"hp",size));
   
        this.potionPos[0] = {x:0,y:0};
        }
        else{
          this.potionPos[0] = {x:0,y:0};
        }
      }
    }
  }
   buyStaminaPotion(size,$event: CdkDragEnd){

    let items = document.getElementsByClassName('item') as HTMLCollectionOf<HTMLElement>;
    items[1].style.cursor="grab";


    if(this.checkIfBought("stamina",1)){
      if(this.player.gold>=10){
        if(this.player.items.length<8){
        this.player.gold-=10;
        let potion = this.images.newStaminaPotion() as HTMLImageElement;
        potion.classList.toggle("potionInBackpack");

        this.player.items.push(new Potion(potion,"stamina",size));
    
        this.potionPos[1] = {x:0,y:0};
      }
      else{
        this.potionPos[1] = {x:0,y:0};
       }
      }
    }
  }
   buySpeedPotion(size,$event: CdkDragEnd){

    let items = document.getElementsByClassName('item') as HTMLCollectionOf<HTMLElement>;
    items[2].style.cursor="grab";

    if(this.checkIfBought("speed",2)){
      if(this.player.gold>=5){
        if(this.player.items.length<8){
        this.player.gold-=5;
        let potion = this.images.newSpeedPotion() as HTMLImageElement;
        potion.classList.toggle("potionInBackpack");

        this.player.items.push(new Potion(potion,"speed",size));
      
        this.potionPos[2] = {x:0,y:0};
        }
        else{
          this.potionPos[2] = {x:0,y:0};
         }
      }
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

  grab(i){
    let items = document.getElementsByClassName('item') as HTMLCollectionOf<HTMLElement>;
    items[i].style.cursor="grabbing";
  }

}
