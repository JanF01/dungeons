import { Component, ViewChild } from "@angular/core";
import { ImagesService } from "./images.service";
import {
  VerificationService,
  TokenPayload,
  PlayerDetails,
} from "./verification.service";
import { GuardService } from "./guard.service";
import { DungeonsComponent } from "./dungeons/dungeons.component";

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
  passRepeat: string = "";

  userState = 0;
  showAlert: boolean = false;

  alert: string = "ffffffffffff";

  state = "";

  credentials: TokenPayload = {
    id: 0,
    login: "",
    email: "jolo@gmail.com",
    password: "",
    experience: 0,
    gold: 0,
    strength: 0,
    hpleft: 0,
    health: 0,
    speed: 0,
    staminaleft: 0,
    stamina: 0,
    luck: 0,
    lvl: 0,
    dungeon_open: 0,
    bp_str: 0,
    bp_hp: 0,
    bp_sp: 0,
    bp_stam: 0,
    bp_luck: 0,
    d1: 0,
    d2: 0,
    d3: 0,
    d4: 0,
    d5: 0,
    d6: 0,
    d7: 0,
    d8: 0,
    d9: 0,
    d10: 0,
    d11: 0,
    d12: 0,
    d13: 0,
    d14: 0,
    d15: 0,
    d16: 0,
    d17: 0,
    d18: 0,
    d19: 0,
  };

  details: PlayerDetails = {
    id: 0,
    login: "",
    email: "jolo@gmail.com",
    password: "",
    experience: 0,
    gold: 0,
    strength: 0,
    hpleft: 0,
    health: 0,
    speed: 0,
    staminaleft: 0,
    stamina: 0,
    luck: 0,
    lvl: 0,
    dungeon_open: 0,
    bp_str: 0,
    bp_hp: 0,
    bp_sp: 0,
    bp_stam: 0,
    bp_luck: 0,
    d1: 0,
    d2: 0,
    d3: 0,
    d4: 0,
    d5: 0,
    d6: 0,
    d7: 0,
    d8: 0,
    d9: 0,
    d10: 0,
    d11: 0,
    d12: 0,
    d13: 0,
    d14: 0,
    d15: 0,
    d16: 0,
    d17: 0,
    d18: 0,
    d19: 0,
    exp: 0,
    iat: 0,
  };

  constructor(
    private images: ImagesService,
    private verify: VerificationService,
    private guard: GuardService
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
      this.dungeons.sendUpdate();
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
    let info1 = document.getElementById("info1");
    let info2 = document.getElementById("info2");
    let l1 = document.getElementById("l1");
    let l2 = document.getElementById("l2");
    let c = document.getElementById("c");
    let l = document.getElementById("l");
    let r = document.getElementById("r");
    r.style.top = "-65%";

    info1.style.top = "-20%";
    info2.style.top = "-20%";
    c.style.top = "-20%";
    l.style.top = "-20%";
    l1.style.top = "-60%";
    l2.style.top = "-60%";
  }

  mainPage() {
    setTimeout(() => {
      let r = document.getElementById("r");
      r.style.top = "-65%";
      let l1 = document.getElementById("l1");
      let l2 = document.getElementById("l2");
      let sp = document.getElementById("sp");
      sp.style.opacity = "0";
      l1.style.top = "-60%";
      l2.style.top = "-60%";
      setTimeout(() => {
        let l1 = document.getElementById("l1");
        let l2 = document.getElementById("l2");
        let info1 = document.getElementById("info1");
        let info2 = document.getElementById("info2");
        let c = document.getElementById("c");
        let l = document.getElementById("l");
        info1.style.top = "calc(34.6vh + 5%)";
        info2.style.top = "calc(34.6vh + 5%)";
        c.style.top = "calc(34.6vh + 6.4%)";
        l.style.top = "calc(34.6vh + 6.4%)";
        l1.style.top = "0";
        l2.style.top = "0";
      }, 500);
    }, 600);
  }

  logValue() {
    if (this.credentials.login.length > 2) {
      return false;
    } else {
      return true;
    }
  }

  register() {
    if (!this.logValue()) {
      if (this.credentials.password == this.passRepeat) {
        this.verify.register(this.credentials).subscribe(
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
      this.verify.login(this.credentials).subscribe(
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
