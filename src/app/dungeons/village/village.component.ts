import { Component, OnInit, Input, ɵPlayer, ViewChild } from '@angular/core';
import { User } from '../models/user.model';
import { ImagesService } from 'src/app/images.service';
import { BlacksmithComponent } from './blacksmith/blacksmith.component';
import { ArmoryComponent } from './armory/armory.component';
import { Armor } from '../models/items/armor.model';
import { Weapon } from '../models/items/weapon.model';

@Component({
  selector: 'app-village',
  templateUrl: './village.component.html',
  styleUrls: ['./village.component.scss']
})
export class VillageComponent implements OnInit {

  @Input('user') player: User;
  @ViewChild(ArmoryComponent) armory: ArmoryComponent;

  village = 'village';

  villageLocation: string = 'village';


  constructor(private images: ImagesService) { }

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


  
  goToArmory(){
   
    this.villageLocation = "armory";
    
    setTimeout(()=>{

      this.armory.newAsortament();

    document.getElementById('inner').style.opacity='1';
    document.getElementById('inner').appendChild(this.images.blacksmith);
    this.images.village.style.display='none';
    },50);


    }

    goToBlacksmith(){


      this.villageLocation = "blacksmith";
      
      setTimeout(()=>{
  
      document.getElementById('inner').style.opacity='1';
      document.getElementById('inner').appendChild(this.images.blacksmith);
      this.images.village.style.display='none';
      },50);



       
    
    }

    backToVillage(){

      this.villageLocation = "village";

      document.getElementById('inner').style.opacity='0';
      this.images.village.style.display='block';

      this.player.itemsOnHold = [];
    }


}
