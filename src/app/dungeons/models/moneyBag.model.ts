export class MoneyBag{
   coins: number;
   graphic: string;
   offset: number;
   class: string;

   constructor(coins,src,offset,cl){
       this.coins = coins;
       this.graphic = src;
       this.offset = offset;
       this.class = cl;
   }


}