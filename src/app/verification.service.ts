import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

export interface PlayerDetails {
  id: number;
  login: string;
  email: string;
  password: string;
  experience: number;
  expmulti: number;
  gold: number;
  strength: number;
  hpleft: number;
  health: number;
  speed: number;
  staminaleft: number;
  stamina: number;
  luck: number;
  lvl: number;
  dungeon_open: number;
  bp_str: number;
  bp_hp: number;
  bp_sp: number;
  bp_stam: number;
  bp_luck: number;
  d1: number;
  d2: number;
  d3: number;
  d4: number;
  d5: number;
  d6: number;
  d7: number;
  d8: number;
  d9: number;
  d10: number;
  d11: number;
  d12: number;
  d13: number;
  d14: number;
  d15: number;
  d16: number;
  d17: number;
  d18: number;
  d19: number;
  exp: number;
  iat: number;
}

export interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  id: number;
  login: string;
  email: string;
  password: string;
  experience: number;
  expmulti: number;
  gold: number;
  strength: number;
  hpleft: number;
  health: number;
  speed: number;
  staminaleft: number;
  stamina: number;
  luck: number;
  lvl: number;
  dungeon_open: number;
  bp_str: number;
  bp_hp: number;
  bp_sp: number;
  bp_stam: number;
  bp_luck: number;
  d1: number;
  d2: number;
  d3: number;
  d4: number;
  d5: number;
  d6: number;
  d7: number;
  d8: number;
  d9: number;
  d10: number;
  d11: number;
  d12: number;
  d13: number;
  d14: number;
  d15: number;
  d16: number;
  d17: number;
  d18: number;
  d19: number;
}

@Injectable({
  providedIn: "root",
})
export class VerificationService {
  private token: string;
  public state: number = 0;

  constructor(private http: HttpClient) {}

  private saveToken(token: string): void {
    localStorage.setItem("userToken", token);
  }

  private getToken(): string {
    this.token = localStorage.getItem("userToken");

    return this.token;
  }

  public getUserDetails(): PlayerDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public register(player: TokenPayload): Observable<any> {
    const base = this.http.post("/players/register", player);

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );
    return request;
  }

  public login(player: TokenPayload): Observable<any> {
    const base = this.http.post("/players/login", player);

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public updateToken(nick): Observable<any> {
    const base = this.http.post("/players/getupdated", { login: nick });

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public logout(): void {
    this.token = "";
    window.localStorage.removeItem("userToken");
  }
}
