import { Component } from '@angular/core';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('showUp',[
      transition('void => *', [
        style({opacity: 0}),
        animate("300ms")
      ]),
    ]),
    trigger('bumpUp',[


      transition('false => true', [
        animate(250,style({transform: 'rotate(180deg) scale(1.5)',left: '{{x}}px', top:'{{y}}px'})),
        animate(250,style({transform: 'rotate(0deg) scale(1)',left: '{{x}}px', top:'{{y}}px'})),
      ],{params: { x: 30, y: 40 }})
  ]),
  trigger('getTogether',[
      transition('false => true',[
        animate(1000,style({position:'absolute', left: '-{{x}}px', top:'-{{y}}px'}))
      ],{params: { x: 30, y: 40 }})
  ])
]
})
export class AppComponent {
  title = 'dungeons';
  sum = 0;
  coins = [];
  amountOfCoins = 0;
  info = "Put the coins in to the corresponding colors";
  lvl: number = 1;
  timer: number = 7.50; 
  timeInfo: string = "";
  roundEnd = false;
  score = 0;
  background = new Audio();
  timeouts = [];




  start(){
    document.getElementById('start').style.display="none";
    this.background.src= "assets/background.mp3";
    this.background.load();
    this.background.volume = 0.04;
    this.background.play();
    this.timeouts[0] = setTimeout(()=>{
    this.roundStart(7.5);
    },1000);

    this.timeouts[1] =  setTimeout(()=>{
           this.checkWin(12.5);
        },16000);
        this.timeouts[2] =  setTimeout(()=>{
          this.checkWin(15);
       },36000);
       this.timeouts[3] =  setTimeout(()=>{
        this.checkWin(19);
     },58500);
     this.timeouts[4] =  setTimeout(()=>{
      this.checkWin(21.5);
   },85000);
   this.timeouts[5] = setTimeout(()=>{
    this.checkWin(25);
 },114000);
 this.timeouts[6] = setTimeout(()=>{
  this.checkWin(25);
},146500);
this.timeouts[7] = setTimeout(()=>{
  this.checkWin(25);
},179000);


  }

  reStart(){
    document.getElementById('restart').style.display="none";
    document.getElementById('info').style.fontSize="2em";
    document.getElementById('info').style.color="black";
    this.sum = 0;
    this.coins = [];
    this.amountOfCoins = 0;
    this.info = "Put the coins in to the corresponding colors";
    this.lvl = 1; 
    this.timer = 7.50; 
    this.timeInfo = "";
    this.roundEnd = false;
    this.score = 0;
    this.start();
  }

  win(){
    document.getElementById('info').style.color="green";
    this.info="You Won. Congratulations!"
    this.roundEnd = true;
    setTimeout(()=>{
      this.coins = [];
      this.roundEnd=false;
      },950);
     let win = new Audio();
     win.src="assets/win.wav";
     win.load();
     win.play();
     document.getElementById('restart').style.display="block";
  }

  checkWin(roundTime: number = 7.5){

     if(this.sum==this.lvl*5){
      this.lvl++;
      
      let s = new Audio();
      s.src= "assets/coins.wav";
      s.load();
      s.volume=0.2;
      s.play();

      document.getElementById('info').style.color="green";
      this.info = "NICE!";

      if(this.lvl==8){
        this.win();
      }
      else{
      this.score+=this.sum;
      this.sum=0;
      this.amountOfCoins=0;
      this.roundEnd = true;
      setTimeout(()=>{
      this.coins = [];
      this.roundEnd=false;
      },950);
       this.roundStart(roundTime);
    }
     }
     else{
      document.getElementById('info').style.color="red";
      this.info = "GAME OVER";
      for(let i=0;i<this.timeouts.length;i++){
        clearTimeout(this.timeouts[i]);
      }
      let over = new Audio();
      over.src= "assets/gameover.wav";
      over.load();
      over.volume = 0.15;
      over.play();
      document.getElementById('restart').style.display="block";
     }
  }

  roundStart(roundTime: number){
    setTimeout(()=>{
      document.getElementById('info').style.fontSize="5em";
      document.getElementById('info').style.color="black";
      this.info="LEVEL " + this.lvl;
    },2000);
    setTimeout(()=>{
      this.info="3";
      let count = new Audio();
      count.src= "assets/odliczanie.wav";
      count.load();
      count.volume = 0.45;
      count.play();
    },4000);
    setTimeout(()=>{
      this.info="2";
    },5000);
    setTimeout(()=>{
      this.info="1";
    },6000);
    setTimeout(()=>{
      this.info="GO!";
    },7000);
    setTimeout(()=>{
      this.info="";
      for(let i=0;i<this.lvl;i++)
      this.generateCoin();
      this.timer = roundTime;
      this.startTimer();
    },7500);
  }

  startTimer(){
    var inter = setInterval(()=>{
         this.timer-=0.01;
         let okt = Math.round((this.timer%1)*100).toString();
         if(okt=="-1") okt="00";
         else if(okt=="0") okt="00";
         this.timeInfo = (this.timer-this.timer%1).toString()+":"+okt;
        if(this.timer<=0){
          clearInterval(inter);
        }

    },10)
  
  }

  generateCoin(){
    for(let i=0;i<5;i++){
    let coin = document.createElement('img');
    let r = Math.floor(Math.random()*4);
    coin.src="assets/coin_"+r+".png";
    coin.style.width="50px";
    coin.classList.toggle('coin');
    this.coins.push([]);

    var WX,WY;
    if( window.innerWidth )
    {
        WX = window.innerWidth;
        WY = window.innerHeight;
    } else {
        WX = document.body.clientWidth;
        WY = document.body.clientHeight;
    }


    this.coins[this.coins.length-1][0] = coin;
    this.coins[this.coins.length-1][3]={x:(Math.random()*WX-30),y:Math.random()*(WY-80)+25};
    this.coins[this.coins.length-1][1] = r;
    if(this.coins[this.coins.length-1][3].x>=((WX)/4)*r-30 &&
       this.coins[this.coins.length-1][3].x<((WX)/4)*(r+1)){
      this.coins[this.coins.length-1][2] = true;
      this.sum++;
    }else{
    this.coins[this.coins.length-1][2] = false;
    }
    }
    this.amountOfCoins+=5;
  
  }

  onDrop($event: CdkDragEnd,coin: any){
    coin[3] = $event.source.getFreeDragPosition();
    if(coin[3].x>=((document.body.clientWidth)/4)*coin[1]-30 && coin[3].x<((document.body.clientWidth)/4)*(coin[1]+1)-20){
      if(!coin[2]){
        let s = new Audio();
      s.src= "assets/coin.wav";
      s.load();
      s.volume = 0.15;
      s.play();

      coin[2] = true;

      this.sum++;
      let back: HTMLCollectionOf<HTMLElement>;

      switch(coin[1]){
      case 0:
      back = document.getElementsByClassName('backyellow') as HTMLCollectionOf<HTMLElement>;
      back[0].style.background="rgb(240, 218, 5)";

      break;
      case 1:
        back = document.getElementsByClassName('backred') as HTMLCollectionOf<HTMLElement>;
      back[0].style.background="rgb(250, 52, 45)";
        break;
        case 2:
          back = document.getElementsByClassName('backblue') as HTMLCollectionOf<HTMLElement>;
        back[0].style.background="rgb(51, 92, 250)";
          break;
          case 3:
            back = document.getElementsByClassName('backviolet') as HTMLCollectionOf<HTMLElement>;
          back[0].style.background="rgb(245, 60, 165)";
            break;
      }
      setTimeout(()=>{
        back[0].style.background="#fff";
      },350);
    }
    }else if(coin[2]){
    coin[2] = false;
    this.sum--;
    }
  }
}
