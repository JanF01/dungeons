import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {

  @Input() gold:number;
  @Input('place') place:string;

  constructor() { }

  ngOnInit(): void {
  }

}
