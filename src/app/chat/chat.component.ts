import { Component, OnInit, Input } from "@angular/core";
import { SocketService } from "../socket.service";
import { Subscribable, Subscription } from "rxjs";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  @Input("chat") globalChat: any;

  globalSub: Subscription;

  message: string;

  constructor(private socket: SocketService) {}

  ngOnInit(): void {}

  sendMessage() {
    if (this.message.length > 0 && this.message.length < 100) {
      this.socket.sendText(this.message);
      this.message = "";
    }
  }
}
