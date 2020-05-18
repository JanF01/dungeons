import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'dungeons';
  mode: number = 2;

  startCoins(){
    this.mode=1;
  }

  startDungeons(){
    this.mode=2;
  }
}
