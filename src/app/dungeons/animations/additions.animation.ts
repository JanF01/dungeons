import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

export const AdditionAnimations = {
  showDamage: trigger("showDamage", [
    state("false", style({ fontSize: "2.0em", opacity: 1, top: "47%" })),
    state("true", style({ fontSize: "3.9em", opacity: 0, top: "-6%" })),
    transition("false => true", [animate(1900)]),
    transition("true => false", [animate(1)]),
  ]),
  showLevelUp: trigger("showLevelUp", [
    state("false", style({ fontSize: "2.4em", opacity: 0, top: "47%" })),
    state("true", style({ fontSize: "3.9em", opacity: 1, top: "-10%" })),
    transition("false => true", [animate(2400)]),
    transition("true => false", [animate(600)]),
  ]),

  grabGold: trigger("grabGold", [
    state("collected", style({ left: "14.6%", top: "17.1em" })),
    state("static", style({ top: "55%" })),
    transition("static => collected", [animate(600)]),
  ]),
  grabGoldUp: trigger("grabGoldUp", [
    state("collected", style({ left: "27.5em", top: "3.6em" })),
    state("static", style({ top: "6em" })),
    transition("static => collected", [animate(600)]),
  ]),
};
