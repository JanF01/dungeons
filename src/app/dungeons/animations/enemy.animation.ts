import { trigger, state, style, transition, animate } from '@angular/animations';

export const EnemyAnimations = {

   enemyAnimation:  trigger('enemyAnimation',[
    state('back',style({left:"70%", filter:"brightness(100%)"})),
    state('takeDamage',style({left:"70%", top: "33%", filter:"brightness(150%) saturate(300%)"})),
    state('throwFireball',style({left:"74%", filter:"brightness(100%)"})),
    state('die',style({opacity:"0"})),
    transition('back => takeDamage', [
      animate(200*0.6)
    ]),
    transition('takeDamage => back', [
      animate(200*0.6)
    ]),
    transition('back => throwFireball', [
      animate(200*0.6)
    ]),
    transition('throwFireball => back', [
      animate(200*0.6)
    ]),
    transition('back => die', [
      animate(1200*0.6)
    ])
  ]),

  enemyAttack: trigger('enemyAttack',[
    state('back',style({opacity:0, left:"80%"})),
    state('throwFireball',style({opacity:1, left:"21%"})),
    transition('back => throwFireball', [
      animate(660*0.6)
    ])
  ]),


}