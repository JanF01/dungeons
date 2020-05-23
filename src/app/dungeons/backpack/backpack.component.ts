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

  constructor(private images: ImagesService) { 

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

}
