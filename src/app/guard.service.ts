import { Injectable } from "@angular/core";
import { VerificationService } from "./verification.service";

@Injectable({
  providedIn: "root",
})
export class GuardService {
  constructor(private verify: VerificationService) {}

  isLoggedIn() {
    if (this.verify.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }
}
