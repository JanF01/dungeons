import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { Subscription } from "rxjs";
import { SocketService } from "../../socket.service";
import { User } from "../models/user.model";
import { ImagesService } from "../../images.service";
import { CaveComponent } from "../cave/cave.component";

@Component({
  selector: "app-arena",
  templateUrl: "./arena.component.html",
  styleUrls: ["./arena.component.scss"],
})
export class ArenaComponent implements OnInit {
  @Input("user") player: User;
  @Output("pvp") pvp: EventEmitter<any> = new EventEmitter();

  playersOnline: Array<any>;

  arenaSub: Subscription;

  arena: string = "arena";

  chosen = false;

  inspect: User;

  constructor(private socket: SocketService, private images: ImagesService) {}

  ngOnInit(): void {
    this.socket.getPlayersNicks();

    this.arenaSub = this.socket.playersNames.subscribe((players) => {
      this.playersOnline = players;
    });
  }

  backHome() {
    this.player.location = "home";

    setTimeout(() => {
      document.getElementById("cont").style.opacity = "1";
      let mBck = document.getElementsByClassName("mainBck") as HTMLCollectionOf<
        HTMLElement
      >;
      mBck[0].style.opacity = "0.8";

      let assets = document.getElementsByClassName("assets")[0];
      assets.innerHTML = "";
      assets.appendChild(this.images.gold);
      assets.append(this.player.gold.toString());
    }, 10);
  }

  choose(target) {
    this.chosen = true;
    this.inspect = target;
  }

  itemForInfo: any;
  showInfoBubble = false;
  bubblePos = { x: 180, y: 180 };

  showInfo(item) {
    if (item != undefined) {
      if (item.name != "none") {
        this.itemForInfo = item;
        this.showInfoBubble = true;
      }
    }
  }
  changePosition($event: MouseEvent) {
    this.bubblePos.x = $event.clientX;
    this.bubblePos.y = $event.clientY;
  }

  hideInfo() {
    this.showInfoBubble = false;
  }

  goPvp(player) {
    if (this.player.missionTime == -3) {
      let staminaRequired = this.player.level;

      if (this.player.staminaLeft >= staminaRequired) {
        if (this.player.weapon.state > 0 && this.player.armor.state > 0) {
          this.player.staminaLeft -= staminaRequired;
          this.pvp.emit(player);
        }
      }
    }
  }
}
