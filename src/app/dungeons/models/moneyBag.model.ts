export class MoneyBag{
   coins: number;
   graphic: string;
   offset: number;
   class: string = "moneyBag";

   constructor(coins,src,offset){
       this.coins = coins;
       this.graphic = src;
       this.offset = offset
   }


}