import { trigger, state, style, transition, animate } from '@angular/animations';

export const AdditionAnimations = {
    
    showDamage: trigger('showDamage',[
        state('false',style({fontSize:"2.0em", opacity:1, top:'47%'})),
        state('true',style({fontSize:"3.9em", opacity:0, top: "-6%"})),
        transition('false => true', [
          animate(1600)
        ]),
        transition('true => false', [
          animate(1)
        ])
      ]),

      grabGold: trigger('grabGold',[
        state("collected",style({left:'14.6%',top:'17.1em'})),
        state("static",style({top:'55%'})),
        transition('static => collected', [
          animate(600)
        ])
      ])

}