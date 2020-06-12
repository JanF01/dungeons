import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { User } from "./dungeons/models/user.model";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  enemyPlayer = this.socket.fromEvent<User>("player");
  playerItems = this.socket.fromEvent<any>("items");

  constructor(private socket: Socket) {}

  loginComplete(player: User) {
    this.socket.emit("addPlayer", player);
  }

  getMyself(nick) {
    this.socket.emit("getPlayer", nick);
  }

  updatePlayer(player: User) {
    this.socket.emit("updatePlayer", player);
  }

  getItems(nick) {
    this.socket.emit("getItems", nick);
  }

  disconnect() {
    this.socket.emit("disconnect");
  }
}
