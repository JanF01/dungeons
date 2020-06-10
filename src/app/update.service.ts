import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UpdateService {
  constructor(private http: HttpClient) {}

  public sendUserData(player) {
    this.http.post("/players/update", player).subscribe(
      (res) => {},
      (err) => {
        console.log(err);
      }
    );
  }

  public dungeonUpdate(dungeonList) {
    this.http.post("/players/dungeonupdate", dungeonList).subscribe(
      (res) => {},
      (err) => {
        console.log(err);
      }
    );
  }
}
