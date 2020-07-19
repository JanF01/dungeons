import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";

const config: SocketIoConfig = { url: "http://localhost:3000", options: {} };

import { NgModule } from "@angular/core";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatGridListModule } from "@angular/material/grid-list";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoinsComponent } from "./coins/coins.component";
import { DungeonsComponent } from "./dungeons/dungeons.component";
import { CaveComponent } from "./dungeons/cave/cave.component";
import { CharacterComponent } from "./dungeons/character/character.component";

import { AudioService } from "./audio.service";
import { ShopComponent } from "./dungeons/shop/shop.component";
import { ImagesService } from "./images.service";
import { BackpackComponent } from "./dungeons/backpack/backpack.component";
import { LeftNavComponent } from "./dungeons/left-nav/left-nav.component";
import { PotionsComponent } from "./dungeons/potions/potions.component";
import { InfobubbleComponent } from "./dungeons/infobubble/infobubble.component";
import { SettingsComponent } from "./settings/settings.component";
import { VillageComponent } from "./dungeons/village/village.component";
import { BlacksmithComponent } from "./dungeons/village/blacksmith/blacksmith.component";
import { ArmoryComponent } from "./dungeons/village/armory/armory.component";
import { MissionsComponent } from "./dungeons/village/missions/missions.component";
import { AlertComponent } from "./dungeons/alert/alert.component";
import { ItemMenuComponent } from "./dungeons/item-menu/item-menu.component";
import { ChatComponent } from "./chat/chat.component";
import { ArenaComponent } from "./dungeons/arena/arena.component";
import { Starter } from "./store/startEquipment";

@NgModule({
  declarations: [
    AppComponent,
    CoinsComponent,
    DungeonsComponent,
    CaveComponent,
    CharacterComponent,
    ShopComponent,
    BackpackComponent,
    LeftNavComponent,
    PotionsComponent,
    InfobubbleComponent,
    SettingsComponent,
    VillageComponent,
    BlacksmithComponent,
    ArmoryComponent,
    MissionsComponent,
    AlertComponent,
    ItemMenuComponent,
    ChatComponent,
    ArenaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatGridListModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [AudioService, ImagesService, Starter],
  bootstrap: [AppComponent],
})
export class AppModule {}
