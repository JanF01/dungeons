import { Component, OnInit, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { SocketService } from "src/app/socket.service";
import { User } from "../models/user.model";
import { ImagesService } from "src/app/images.service";

@Component({
  selector: "app-arena",
  templateUrl: "./arena.component.html",
  styleUrls: ["./arena.component.scss"],
})
export class ArenaComponent implements OnInit {
  @Input("user") player: User;

  playersOnline: Array<any>;

  arenaSub: Subscription;

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
}
