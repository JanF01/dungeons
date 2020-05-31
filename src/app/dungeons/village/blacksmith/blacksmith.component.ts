import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { ImagesService } from 'src/app/images.service';
import { Item } from '../../models/item.model';
import { Crystal } from '../../models/items/crystal.model';

@Component({
  selector: 'app-blacksmith',
  templateUrl: './blacksmith.component.html',
  styleUrls: ['./blacksmith.component.scss']
})
export class BlacksmithComponent implements OnInit {


  @Input('user') player: User;
  village = 'shop';
  itemForUpgrade: any;
  gemForUpgrade: Crystal;
  upgradedItem: any = {sum:2};

  arrayForItems: Array<number> = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
  arrayItemsPos = [];
  
  constructor(private images: ImagesService) { }

  ngOnInit(): void {
  }


  itemForInfo: any;
  showInfoBubble = false;
  bubblePos = {x:180,y:180};

  showInfo(item){
    if(item!=undefined){
      this.itemForInfo = item;
      this.showInfoBubble=true;
    }
  }
  changePosition($event: MouseEvent){
 
    if(!this.dragging){
      this.bubblePos.x = $event.clientX;
      this.bubblePos.y = $event.clientY;
     }
     else{
       let pos = this.draggedItem.getBoundingClientRect();
       this.bubblePos.x = pos.x+window.innerWidth/15;
        this.bubblePos.y = pos.y;
     }
    
  }

  hideInfo(){
    this.showInfoBubble=false;
  }


dragging: boolean = false;
draggedItem: HTMLElement;

  grab(i){
    let items = document.getElementsByClassName('spot') as HTMLCollectionOf<HTMLElement>;
    items[i].style.cursor="grabbing";
    this.dragging=true;
    let pos = items[i].getBoundingClientRect();
    this.draggedItem = items[i];
    this.bubblePos.x = pos.x+window.innerWidth/15;
    this.bubblePos.y = pos.y;
  }

  getClass(item){
      if(item!=undefined){
        return item.type;
      }else{
        return 'normal';
      }
  }

  checkIfUpgraded(){
    return this.upgradedItem.sum!=2;
  }
   
  dropItem(i){
    let items = document.getElementsByClassName('spot') as HTMLCollectionOf<HTMLElement>;

    var dropedPos = items[i].getBoundingClientRect();


    if(this.checkIfAnvil(dropedPos)){
    
      if(this.player.items[i].amp!=undefined){
        this.gemForUpgrade=this.player.items[i];
      }
      else{
        this.itemForUpgrade=this.player.items[i];
      }

    }
      
    this.createUpgradedItem();
  
      this.setDefault(i);
    
  }

  checkIfAnvil(dropedPos){
    
    var anvil = document.getElementsByClassName('anvil') as HTMLCollectionOf<HTMLElement>;
    let anvilPos = anvil[0].getBoundingClientRect();
    let w = window.innerWidth;

    if(dropedPos.x>anvilPos.x-w/14 && dropedPos.x<anvilPos.x+w/2 && dropedPos.y>anvilPos.y-w/15 && dropedPos.y<anvilPos.y+w/14){
      return true;
    }else{
      return false;
    }
  }

  createUpgradedItem(){
    if(this.itemForUpgrade!=undefined && this.gemForUpgrade!=undefined){
      if((this.itemForUpgrade.damageLow!=undefined && (this.gemForUpgrade.amp=='dmg' || this.gemForUpgrade.amp=="speed")) ||
         (this.itemForUpgrade.defence!=undefined && (this.gemForUpgrade.amp=='hp' || this.gemForUpgrade.amp=="speed")) ||
         ((this.itemForUpgrade.critical!=undefined || this.itemForUpgrade.critM!=undefined) && (this.gemForUpgrade.amp=='exp'))){
          this.upgradedItem = {sum:2};
        Object.assign(this.upgradedItem,this.itemForUpgrade);
        this.upgradedItem.gem = this.gemForUpgrade;
        this.upgradedItem.sum=3;
        this.changeGem();

         }
         else{
          this.upgradedItem = {sum:2};
         }
    }
  }

  setDefault(i){
    let items = document.getElementsByClassName('spot') as HTMLCollectionOf<HTMLElement>;
    for(let i=0;i<items.length;i++){
      items[i].style.cursor="grab";
    }
    this.arrayItemsPos[i] = {x:0,y:0};
    this.dragging=false;
  }


  changeGem(){

    this.upgradedItem.gem = this.gemForUpgrade;

    if(this.gemForUpgrade.amp=='dmg'){
      this.upgradedItem.damageLow*=1+this.gemForUpgrade.power;
      this.upgradedItem.damageHigh*=1+this.gemForUpgrade.power;
      this.upgradedItem.damageLow = Math.round(this.upgradedItem.damageLow*10)/10;
      this.upgradedItem.damageHigh = Math.round(this.upgradedItem.damageHigh*10)/10;
    }
  }
}
