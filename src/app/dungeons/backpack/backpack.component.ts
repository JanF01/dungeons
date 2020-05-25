import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user.model';
import { ImagesService } from '../../images.service';

@Component({
  selector: 'app-backpack',
  templateUrl: './backpack.component.html',
  styleUrls: ['./backpack.component.scss']
})
export class BackpackComponent implements OnInit {

  @Input('user') player: User;
  arrayForItems: Array<number> = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];
  arrayItemsPos = [];
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

  setDefault(i){
    let items = document.getElementsByClassName('spot') as HTMLCollectionOf<HTMLElement>;
    for(let i=0;i<items.length;i++){
      items[i].style.cursor="grab";
    }
    this.arrayItemsPos[i] = {x:0,y:0};
    this.dragging=false;
  }

}
