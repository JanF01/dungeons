import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoinsComponent } from './coins/coins.component';
import { DungeonsComponent } from './dungeons/dungeons.component';
import { CaveComponent } from './dungeons/cave/cave.component';
import { CharacterComponent } from './dungeons/character/character.component';

import { AudioService } from './audio.service';


@NgModule({
  declarations: [
    AppComponent,
    CoinsComponent,
    DungeonsComponent,
    CaveComponent,
    CharacterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatGridListModule,
    FormsModule
  ],
  providers: [AudioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
