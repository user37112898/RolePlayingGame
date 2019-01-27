import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './components/app.component';
import { CharacterComponent } from "./components/character/character";
import { FightComponent } from "./components/fight/fight";
import { InventoryComponent } from "./components/inventory/inventory";
import { StoryComponent } from "./components/story/story";
import { StartComponent } from "./components/start/start";
import { GameControllerService } from './services/game-controller.service';

const routes : Routes = [
  { path:"",component:StartComponent},
  { path:"story",component:StoryComponent},
  { path:"character",component:CharacterComponent},
  { path:"fight",component:FightComponent},
  { path:"**",redirectTo:""}
];


@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    FightComponent,
    InventoryComponent,
    StoryComponent,
    StartComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule, 
  ],
  providers: [
    GameControllerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
