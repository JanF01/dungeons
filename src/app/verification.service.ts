import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

export interface PlayerDetails {
  id: number;
  login: string;
  email: string;
  password: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  id: number;
  login: string;
  email: string;
  password: string;
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
    if (!this.token) {
      this.token = localStorage.getItem("userToken");
    }
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
