import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-item-menu",
  templateUrl: "./item-menu.component.html",
  styleUrls: ["./item-menu.component.scss"],
})
export class ItemMenuComponent implements OnInit {
  @Input("option") option: string;
  @Output("clicked") clicked: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  wear(): void {
    if (this.option == "Wear") {
      this.clicked.emit("wear");
    } else {
      this.clicked.emit("off");
    }
  }
  sell(): void {
    this.clicked.emit("sell");
  }
}
