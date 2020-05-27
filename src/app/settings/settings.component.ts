import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AudioService } from '../audio.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {


  @Input() showSettings: boolean;
  @Output('close') closeSettings: EventEmitter<any> = new EventEmitter();

  sound = 0.5;

  constructor( private audio: AudioService) { }

  ngOnInit(): void {
  }

  closeSet(){
    this.closeSettings.emit(null);
  }

  sendValue($event){
    this.sound = $event.target.value;
    let s = +this.sound;
    this.audio.globalVolume = s*3;
    this.audio.changeVolumes();
  }





}
