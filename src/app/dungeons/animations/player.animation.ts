import { trigger, state, style, transition, animate } from '@angular/animations';

export const PlayerAnimations = {
    
    showUp: trigger('showUp',[
        transition('void => *',[
            animate(10,style({opacity:1}))
          ]),
    ]),

    momentum: trigger('momentum',[
        state('back',style({left:"20%"})),
        state('playerTurn',style({left:"40%"})),
        transition('back => playerTurn', [
          animate(400*0.5)
        ]),
        transition('playerTurn => back', [
          animate(400*0.5)
        ]),
      ]),

     swordMomentum: trigger('swordMomentum',[
        state('back',style({opacity:0, left:"30%", transform:"rotate(0deg)"})),
        state('throw',style({opacity:1, left:"75%", transform:"rotate(45deg)"})),
        transition('back => throw', [
          animate(300*0.5)
        ]),
        transition('throw => back', [
          animate(300*0.5)
        ])
      ]),

      takeDamage: trigger('takeDamage',[
        state('false',style({left:'20%', filter:"brightness(100%)"})),
        state('true',style({left: '13%', filter:"brightness(260%)"})),
      transition('false=>true',[
          animate(200*0.5)
      ]),
      transition('true=>false',[
        animate(200*0.5)
    ])
   ]),
     levelUp: trigger('levelUp',[
       state('false',style({filter: "brightness(100%)"})),
       state('true',style({top:'19%', filter: "brightness(400%)"})),

       transition('false=>true',[
        animate(2600*0.5)
      ]),
    transition('true=>false',[
      animate(1200*0.5)
     ])
     ])

}