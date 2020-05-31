import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { ImagesService } from 'src/app/images.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-armory',
  templateUrl: './armory.component.html',
  styleUrls: ['./armory.component.scss']
})
export class ArmoryComponent implements OnInit {

  @Input('user') player: User;
  village = 'shop';

  weaponPos = [
    {x:0,y:0},
    {x:0,y:0},
    {x:0,y:0}
  ];
  armorPos = [
    {x:0,y:0},
    {x:0,y:0},
    {x:0,y:0}
  ];
  
  constructor(private images: ImagesService) { }

  ngOnInit(): void {
  }

  grab(i){
    let items = document.getElementsByClassName('item') as HTMLCollectionOf<HTMLElement>;
    items[i].style.cursor="grabbing";
  }

  itemForInfo: any;
  showInfoBubble = false;
  bubblePos = {x:180,y:180};

  showInfo(item){
  
      this.itemForInfo = item;
      this.showInfoBubble=true;

  }
  changePosition($event: MouseEvent){
     this.bubblePos.x = $event.clientX;
     this.bubblePos.y = $event.clientY;
  }

  hideInfo(){
    this.showInfoBubble=false;
  }

  buyItem(item,n,div,t){
    
    if(this.checkIfBought(item,div,t,n)){
       if(this.player.items.length<27){
         if(this.player.gold>=item.cost){

         let itemCopy: any = {};
         Object.assign(itemCopy,item);

         itemCopy.cost = Math.round(item.cost*0.7);
         this.player.items.push(itemCopy);
         this.player.itemsOnHold.push(itemCopy);
         this.player.gold-=item.cost;

         }
       }
       t[n] = {x:0,y:0};
    }else{
      t[n] = {x:0,y:0};
    }


  }

  checkIfBought(item,div,t,n){


    var spot = document.getElementById(div).getBoundingClientRect();

    let backpack = document.getElementsByClassName('backpack') as HTMLCollectionOf<HTMLElement>;
    let width = window.innerWidth;
    var rect = backpack[0].getBoundingClientRect(); 
    if(spot.x<=rect.x+width*0.8 && spot.x>rect.x+width/16 && spot.y>=rect.y-width/25 && spot.y<rect.y+width/35){
      return true;
     }
     else{
      t[n] = {x:0,y:0};
      return false;
    }
  }

}
