import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-potions',
  templateUrl: './potions.component.html',
  styleUrls: ['./potions.component.scss']
})
export class PotionsComponent implements OnInit {

  @Input() potions;
  @Input('user') player: User;
  @Input('buildUp') speedBuildUp: number;
  @Input('character') character;

  constructor() { }

  ngOnInit(): void {
  }

  drinkPotion(n){
    switch(n){
      case 0:
        if(this.potions.hp>0){
         var l = this.player.items.length-1;
        for(let i=l;i>=0;i--){
          if(this.player.items[i].type=="hp"){
           this.player.health+=this.player.items[i].power+this.player.hitPoints*0.09;
           if(this.player.health>this.player.hitPoints){
             this.player.health=this.player.hitPoints;
           }
            this.player.items.splice(i,1);
            this.potions.hp--;

    
            break;
          }
        }
       }
        break;
        case 1:
         if(this.potions.stamina>0){
           var l = this.player.items.length-1;
          for(let i=l;i>=0;i--){
            if(this.player.items[i].type=="stamina"){
             this.player.stamina+=this.player.items[i].power;
              this.player.items.splice(i,1);
              this.potions.stamina--;
  
              break;
            }
          }
         }
          break;
          case 2:
           if(this.potions.speed>0){
             var l = this.player.items.length-1;
            for(let i=l;i>=0;i--){
              if(this.player.items[i].type=="speed"){
                let power = this.player.items[i].power;
                if(this.player.speed<80){
               this.player.speed+=power;
               this.player.speedBuildUp+=power;
                }
                this.player.items.splice(i,1);
                this.potions.speed--;

                break;
              }
            }
           }
            break;
    }
  }

}
