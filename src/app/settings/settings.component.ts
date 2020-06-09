import { Component, OnInit, Input, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { AudioService } from "../audio.service";
import { VerificationService } from "../verification.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  @Input() showSettings: boolean;
  @Output("close") closeSettings: EventEmitter<any> = new EventEmitter();

  sound = 0.5;

  constructor(
    private audio: AudioService,
    private verify: VerificationService
  ) {}

  ngOnInit(): void {}

  closeSet() {
    this.closeSettings.emit(null);
  }

  sendValue($event) {
    this.sound = $event.target.value;
    let s = +this.sound;
    this.audio.globalVolume = s * 2;
    this.audio.changeVolumes();
  }

  logout() {
    this.verify.logout();
    location.reload();
  }
}
