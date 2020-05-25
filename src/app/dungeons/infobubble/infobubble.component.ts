import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-infobubble',
  templateUrl: './infobubble.component.html',
  styleUrls: ['./infobubble.component.scss']
})
export class InfobubbleComponent implements OnInit {

  @Input('item') item: any;

  constructor() { }

  ngOnInit(): void {
  }

  getSrc(){

    switch(this.item.type){
       case 'hp':
            return "assets/healthPotionInfo.png";
          break;
       case 'stamina':
            return "assets/staminaPotionInfo.png";
          break;
       case 'speed':
            return "assets/speedPotionInfo.png";
          break;
       case 'normal':
            return "assets/itemInfo.png";
        break;
        case 'legend':
            return "assets/legendItemInfo.png";
        break;
    }
  
  }

}
