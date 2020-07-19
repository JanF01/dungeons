import { Component, ViewChild } from "@angular/core";
import { ImagesService } from "./images.service";
import {
  VerificationService,
  TokenPayload,
  PlayerDetails,
} from "./verification.service";
import { GuardService } from "./guard.service";
import { DungeonsComponent } from "./dungeons/dungeons.component";
import { SocketService } from "./socket.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  @ViewChild(DungeonsComponent) dungeons: DungeonsComponent;

  title = "dungeons";
  mode: number = 0;
  shSettings = false;
  registerBck: any;
  pass: string = "";
  passRepeat: string = "";

  globalChat: any;
  globalSub: Subscription;

  userState = 0;
  showAlert: boolean = false;

  alert: string = "ffffffffffff";

  state = "";

  chatOn: boolean = false;

  info1: HTMLElement;
  info2: HTMLElement;
  l1: HTMLElement;
  l2: HTMLElement;
  c: HTMLElement;
  l: HTMLElement;
  r: HTMLElement;
  sp: HTMLElement;

  credentials: TokenPayload = {} as any;
  details: PlayerDetails = {} as any;

  constructor(
    private images: ImagesService,
    private verify: VerificationService,
    private guard: GuardService,
    private socket: SocketService
  ) {
    setTimeout(() => {
      this.registerBck = this.images.registerBck;
    }, 10);

    if (this.guard.isLoggedIn()) {
      this.details = this.verify.getUserDetails();
      this.verify.updateToken(this.details.login).subscribe(
        (resp) => {
          if (resp.error) {
            this.alert = resp.error;
            this.showAlert = true;
          } else {
            this.mode = 3;
            this.details = this.verify.getUserDetails();
            setTimeout(() => {
              this.dungeons.setPlayer(this.details);
            }, 200);
          }
        },
        (err) => {
          this.alert = err.error.text;
          this.showAlert = true;
        }
      );
    }

    this.globalSub = this.socket.chat.subscribe((chat) => {
      this.globalChat = chat;
    });

    setTimeout(() => this.getElements(), 500);
  }

  getElements(): void {
    this.r = document.getElementById("r");
    this.info1 = document.getElementById("info1");
    this.info2 = document.getElementById("info2");
    this.sp = document.getElementById("sp");
    this.l1 = document.getElementById("l1");
    this.l2 = document.getElementById("l2");
    this.c = document.getElementById("c");
    this.l = document.getElementById("l");
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
  closeSettings(value) {
    if (value == "close") {
      this.shSettings = false;
    } else {
      this.socket.disconnect();
    }
  }

  spikePos = { x: 0, y: 0 };

  panelDown() {
    setTimeout(() => {
      let l1 = document.getElementById("l1");
      let l2 = document.getElementById("l2");
      let r = document.getElementById("r");
      let sp = document.getElementById("sp");
      this.spikePos = { x: 0, y: 0 };
      sp.style.opacity = "0.9";
      r.style.top = "30%";
      l1.style.top = "0";
      l2.style.top = "0";
    }, 500);
  }

  reg() {
    this.userState = 1;
    this.state = "register";

    this.tablesUp();

    this.panelDown();
  }

  log() {
    this.userState = 1;
    this.state = "login";

    this.tablesUp();

    this.panelDown();
  }

  tablesUp() {
    this.r.style.top = "-65%";
    this.info1.style.top = "-20%";
    this.info2.style.top = "-20%";
    this.c.style.top = "-20%";
    this.l.style.top = "-20%";
    this.l1.style.top = "-60%";
    this.l2.style.top = "-60%";
  }

  mainPage() {
    setTimeout(() => {
      this.r.style.top = "-65%";
      this.sp.style.opacity = "0";
      this.l1.style.top = "-60%";
      this.l2.style.top = "-60%";
      setTimeout(() => {
        this.info1.style.top = "calc(34.6vh + 5%)";
        this.info2.style.top = "calc(34.6vh + 5%)";
        this.c.style.top = "calc(34.6vh + 6.4%)";
        this.l.style.top = "calc(34.6vh + 6.4%)";
        this.l1.style.top = "0";
        this.l2.style.top = "0";
      }, 500);
    }, 600);
  }

  logValue() {
    return this.credentials.login.length <= 2;
  }

  register() {
    if (!this.logValue()) {
      if (this.pass == this.passRepeat) {
        this.verify.register(this.credentials, this.pass).subscribe(
          (resp) => {
            if (resp.error) {
              this.alert = resp.error;
              this.showAlert = true;
            } else {
              this.mode = 2;
              this.tablesUp();
              this.details = this.verify.getUserDetails();
              setTimeout(() => {
                this.dungeons.setPlayer(this.details);
              }, 200);
            }
          },
          (err) => {
            this.alert = err.error.text;
            this.showAlert = true;
          }
        );
      } else {
        this.alert = "Passwords aren't the same";
        this.showAlert = true;
      }
    } else {
      this.alert = "To short login - minimum length of 3";
      this.showAlert = true;
    }
  }

  login() {
    if (!this.logValue()) {
      this.verify.login(this.credentials, this.pass).subscribe(
        (resp) => {
          if (resp.error) {
            this.alert = resp.error;
            this.showAlert = true;
          } else {
            this.mode = 2;
            this.tablesUp();
            this.details = this.verify.getUserDetails();
            setTimeout(() => {
              this.dungeons.setPlayer(this.details);
            }, 200);
          }
        },
        (err) => {
          this.alert = err.error.text;
          this.showAlert = true;
        }
      );
    } else {
      this.alert = "To short login - minimum length of 3";
      this.showAlert = true;
    }
  }
}
