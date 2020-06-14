import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { User } from "./dungeons/models/user.model";

@Injectable({
  providedIn: "root",
})
export class SocketService {
  enemyPlayer = this.socket.fromEvent<User>("player");
  playerItems = this.socket.fromEvent<any>("items");
  chat = this.socket.fromEvent<any>("chat");
  playersNames = this.socket.fromEvent<any>("names");

  constructor(private socket: Socket) {}

  loginComplete(player: User) {
    this.socket.emit("addPlayer", player);
    this.socket.emit("getItems", player);
  }

  getMyself(nick) {
    this.socket.emit("getPlayer", nick);
  }

  getPlayersNicks() {
    this.socket.emit("getNicks");
  }

  updatePlayer(player: User) {
    this.socket.emit("updatePlayer", player);
  }

  sendText(text) {
    this.socket.emit("write", text);
  }

  disconnect() {
    this.socket.emit("disconnect");
  }
}
