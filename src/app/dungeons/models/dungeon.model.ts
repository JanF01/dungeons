import { Enemy } from "./enemy.model";


export class Dungeon {

   img: string;
   monsters: Array<Enemy>;
   completed: number = 0;
   open: boolean;
   

   constructor(src,enemys,comp=0,open=false){
     this.img = src;
     this.monsters = enemys;
     this.completed = comp;
     this.open = open;
   }


}