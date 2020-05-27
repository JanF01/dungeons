import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  title = 'dungeons';
  mode: number = 2;
  shSettings = false;
  

  startCoins(){
    this.mode=1;
  }

  startDungeons(){
    this.mode=2;
  }

  showSettings(){
     this.shSettings=true;
  }
  closeSettings(){
    this.shSettings=false;
  }
}
