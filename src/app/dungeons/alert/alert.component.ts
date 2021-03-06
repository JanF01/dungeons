import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
})
export class AlertComponent implements OnInit {
  @Input("input") value: string;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  closeAlert():void {
    (this.value.search("duel") != -1)
     ? this.close.emit("duel")
     : this.close.emit(null);
  }
}
