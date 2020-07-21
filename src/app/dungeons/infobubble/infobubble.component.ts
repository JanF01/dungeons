import { Component, OnInit, Input } from "@angular/core";
import { ImagesService } from "../../images.service";

@Component({
  selector: "app-infobubble",
  templateUrl: "./infobubble.component.html",
  styleUrls: ["./infobubble.component.scss"],
})
export class InfobubbleComponent implements OnInit {
  @Input("item") item: any;
  @Input("user") player: any;

  constructor(private images: ImagesService) {}

  ngOnInit(): void {}

  getPower(p): number {
    return this.item.type == "hp"
      ? Math.round(p + this.player.hitPoints * 0.09)
      : p;
  }

  getSrc(): string {
    switch (this.item.type) {
      case "hp":
        return this.images.healthBubble.src;
        break;
      case "stamina":
        return this.images.staminaBubble.src;
        break;
      case "speed":
        return this.images.speedBubble.src;
        break;
      case "normal":
        return this.images.normalBubble.src;
        break;
      case "legend":
        return this.images.legendBubble.src;
        break;
      case "artefact":
        return this.images.artefactBubble.src;
        break;
      case "holy":
        return this.images.holyBubble.src;
        break;
      case "revered":
        return this.images.reveredBubble.src;
        break;
    }
  }

  getType(): string {
    return (
      this.item.type[0].toUpperCase() +
      this.item.type.slice(1, this.item.type.length)
    );
  }

  getCritical(): number {
    return Math.round(this.item.critical * 100);
  }
  getCriticalMulti(): number {
    return Math.round(this.item.critM * 100);
  }
  getCrystal(c): string {
    switch (c) {
      case "dmg":
        return "Damage";
      case "hp":
        return "Health";
      case "speed":
        return "Speed";
      case "exp":
        return "Experience";
    }
  }
  getGemPerk(): string {

    let power = this.item.gem.power * 100;
    switch (this.item.gem.amp) {
      case "speed":
        return "Speed +" + Math.round(this.item.gem.power);
        break;
      case "hp":
        return "Health +" + Math.round(power) + "%";
        break;
      case "exp":
        return "Experience +" + Math.round(power) + "%";
        break;
      case "dmg":
        return "Damage +" + Math.round(power) + "%";
        break;
    }
  }

  getBoost(): string {
    switch (this.item.amp) {
      case "dmg":
      case "hp":
      case "exp":
        return Math.round(this.item.power * 100) + "%";
        break;
      case "speed":
        return this.item.power;
        break;
    }
  }
}
