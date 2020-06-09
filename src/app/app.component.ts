import { Component } from "@angular/core";
import { ImagesService } from "./images.service";
import { VerificationService, TokenPayload } from "./verification.service";
import { GuardService } from "./guard.service";

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
      this.mode = 3;
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
  closeSettings() {
    this.shSettings = false;
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
