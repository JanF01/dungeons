import { Component, OnInit, Input } from "@angular/core";
import { User } from "../models/user.model";
import { SocketService } from "src/app/socket.service";

@Component({
  selector: "app-potions",
  templateUrl: "./potions.component.html",
  styleUrls: ["./potions.component.scss"],
})
export class PotionsComponent implements OnInit {
  @Input() potions;
  @Input("user") player: User;
  @Input("buildUp") speedBuildUp: number;
  @Input("character") character;

  constructor(private socket: SocketService) {}

  ngOnInit(): void {}

  deletePotion(i, type): void{
    this.player.potions.splice(i, 1);
    this.potions[type]--;
  }

  drinkPotion(n, type): void {
    if (this.potions[type] > 0) {
    switch (n) {
      case 0:
          var l = this.player.potions.length - 1;
          for (let i = l; i >= 0; i--) {
            if (this.player.potions[i].type == "hp") {
              this.player.health += Math.round(
                this.player.potions[i].refill + this.player.hitPoints * 0.09
              );
              if (this.player.health > this.player.hitPoints) {
                this.player.health = this.player.hitPoints;
              }
              this.deletePotion(i,type);

              this.socket.updatePlayer(this.player);

              break;
            }
          }
        break;
      case 1:
          var l = this.player.potions.length - 1;
          for (let i = l; i >= 0; i--) {
            if (this.player.potions[i].type == "stamina") {
              if (this.player.staminaLeft < this.player.stamina) {
                this.player.staminaLeft += this.player.potions[i].refill;
                this.deletePotion(i,type);

                if (this.player.staminaLeft > this.player.stamina) {
                  this.player.staminaLeft = this.player.stamina;
                }
              }
              this.socket.updatePlayer(this.player);
              break;
            }
          }
        break;
      case 2:
          var l = this.player.potions.length - 1;
          for (let i = l; i >= 0; i--) {
            if (this.player.potions[i].type == "speed") {
              let refill = this.player.potions[i].refill;
              if (this.player.speed < 80) {
                this.player.speed += refill;
                this.player.speedBuildUp += refill;
              }
              this.deletePotion(i,type);

              this.socket.updatePlayer(this.player);
              break;
            }
          }
        break;
    }
   }
  }
}
