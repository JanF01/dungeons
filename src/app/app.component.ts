import { Component } from "@angular/core";
import { ImagesService } from "./images.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "dungeons";
  mode: number = 0;
  shSettings = false;
  registerBck: any;

  userState = 0;

  constructor(private images: ImagesService) {
    setTimeout(() => {
      this.registerBck = this.images.registerBck;
    }, 10);
  }
  startCoins() {
    this.mode = 1;
  }

  startDungeons() {
    this.mode = 2;
  }

  showSettings() {
    this.shSettings = true;
  }
  closeSettings() {
    this.shSettings = false;
  }

  register() {
    this.userState = 1;

    this.tablesUp();

    setTimeout(() => {
      let l1 = document.getElementById("l1");
      let l2 = document.getElementById("l2");
      let r = document.getElementById("r");
      r.style.top = "30%";
      l1.style.top = "0";
      l2.style.top = "0";
    }, 500);
  }

  tablesUp() {
    let info1 = document.getElementById("info1");
    let info2 = document.getElementById("info2");
    let l1 = document.getElementById("l1");
    let l2 = document.getElementById("l2");
    let c = document.getElementById("c");
    let l = document.getElementById("l");

    info1.style.top = "-20%";
    info2.style.top = "-20%";
    c.style.top = "-20%";
    l.style.top = "-20%";
    l1.style.top = "-60%";
    l2.style.top = "-60%";
  }
}
