import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user.model';
import { ImagesService } from '../../images.service';
import { Weapon } from '../models/items/weapon.model';
import { Armor } from '../models/items/armor.model';

@Component({
  selector: 'app-backpack',
  templateUrl: './backpack.component.html',
  styleUrls: ['./backpack.component.scss']
})
export class BackpackComponent implements OnInit {

  @Input('user') player: User;
  arrayForItems: Array<number> = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
  arrayItemsPos = [];

  backpack = "backpack";
  
  constructor(private images: ImagesService) { 
       for(let i=0;i<=35;i++){
         this.arrayItemsPos.push({x:0,y:0});
       }
  }

  ngOnInit(): void {
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

  showBackpack(){
    document.getElementById('backpack').style.opacity="1";
  }

  preventRightClick($event: MouseEvent){
    $event.preventDefault();
  }

  itemForInfo: any;
  showInfoBubble = false;
  bubblePos = {x:180,y:180};


  showInfo(item){
  
      this.itemForInfo = item;
      this.showInfoBubble=true;

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


  

  dropItem(i){
    let items = document.getElementsByClassName('spot') as HTMLCollectionOf<HTMLElement>;

    var dropedPos = items[i].getBoundingClientRect();

     this.checkIfSold(this.player.items[i-9],dropedPos,i-9);

    if(this.player.items[i-9]==undefined){
      this.setDefault(i);
    }
    else if(this.player.items[i-9].damageLow!=undefined){
      this.changeItems(this.player.items[i-9],dropedPos,i,"weapon");
    }
    else if(this.player.items[i-9].defence!=undefined){
      this.changeItems(this.player.items[i-9],dropedPos,i,"armor");
    }
    else if(this.player.items[i-9].critical!=undefined){
      this.changeItems(this.player.items[i-9],dropedPos,i,"necklace");
    }
    else if(this.player.items[i-9].critM!=undefined){
      this.changeItems(this.player.items[i-9],dropedPos,i,"ring");
    }
    else{
      this.setDefault(i);
    }
  }

  checkIfSold(item,pos,i){
      let box = document.getElementById('sell').getBoundingClientRect();
      let w =  window.innerWidth;
      if(pos.x>box.x-w/25 && pos.x<box.x+w/14 && pos.y>box.y-w/17 && pos.y<box.y+w/14){
         this.player.items.splice(i,1);
         this.player.gold+=item.cost;
         this.hideInfo();
      }
  }


  changeItems(item,pos,i,type){

    let box = document.getElementById(type).getBoundingClientRect();
    let w =  window.innerWidth;

    if(pos.x>box.x-w/16 && pos.x<box.x+w/15 && pos.y>box.y-w/17 && pos.y<box.y+w/14){

      if(type=="weapon"){

        if(this.player.weapon.gem!=undefined){
          let gem = this.player.weapon.gem;
          if(gem.amp=='speed'){
            this.player.speed-=gem.power;
          }
        }

        this.player.items[this.player.items.indexOf(item)] = this.player.weapon;
        this.player.weapon = item;

        if(this.player.weapon.gem!=undefined){
          let gem = this.player.weapon.gem;
          if(gem.amp=='speed'){
            this.player.speed+=gem.power;
          }
        }
      }
      else if(type=="armor"){

        if(this.player.armor.gem!=undefined){
          let gem = this.player.armor.gem;
          if(gem.amp=='speed'){
            this.player.speed-=gem.power;
          }
          else if(gem.amp=='hp'){
            this.player.hitPoints-=Math.ceil((this.player.hitPoints-(this.player.hitPoints*gem.power))*gem.power*(1+gem.power));
          }
        }

        this.player.items[this.player.items.indexOf(item)] = this.player.armor;
        this.player.armor = item;

        if(this.player.armor.gem!=undefined){
          let gem = this.player.armor.gem;
          if(gem.amp=='speed'){
            this.player.speed+=gem.power;
          }
          else if(gem.amp=='hp'){
            this.player.hitPoints+=Math.ceil((this.player.hitPoints)*gem.power);
          }
        }
      }
      else if(type=="necklace"){

        if(this.player.necklace.gem!=undefined){
          let gem = this.player.necklace.gem;
          if(gem.amp=='exp'){
            this.player.expMulti-=gem.power;
          }
        }

        this.player.stamina-=this.player.items[this.player.items.indexOf(item)].stamina;
        this.player.staminaLeft-=this.player.items[this.player.items.indexOf(item)].stamina;


        this.player.items[this.player.items.indexOf(item)] = this.player.necklace;
        this.player.necklace = item;

        this.player.stamina+=item.stamina;
        this.player.staminaLeft+=item.stamina;

        if(this.player.necklace.gem!=undefined){
          let gem = this.player.necklace.gem;
          if(gem.amp=='exp'){
            this.player.expMulti+=gem.power;
          }
        }

      }
      else if(type=="ring"){

        if(this.player.ring.gem!=undefined){
          let gem = this.player.ring.gem;
          if(gem.amp=='exp'){
            this.player.expMulti-=gem.power;
          }
        }

        this.player.stamina-=this.player.items[this.player.items.indexOf(item)].stamina;

        this.player.items[this.player.items.indexOf(item)] = this.player.ring;
        this.player.ring = item;

        this.player.stamina+=item.stamina;
        this.player.staminaLeft+=item.stamina;
        
        if(this.player.ring.gem!=undefined){
          let gem = this.player.ring.gem;
          if(gem.amp=='exp'){
            this.player.expMulti+=gem.power;
          }
        }
      }

      
      this.setDefault(i);
    }else{
    this.setDefault(i);
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

}
