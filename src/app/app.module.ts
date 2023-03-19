import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { FormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon';
import { PokemonDisplayComponent } from './pokemon/pokemon-display/pokemon-display.component';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PokemonDisplayComponent,
    PokemonListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
