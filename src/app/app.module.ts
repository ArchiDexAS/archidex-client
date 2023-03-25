import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { PokemonDisplayComponent } from './pokemon/pokemon-display/pokemon-display.component';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokeInterceptorInterceptor } from './interceptor/poke-interceptor.interceptor';
import { DebugInterceptor } from './interceptor/debug.interceptor';

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
    HttpClientModule,
    FormsModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PokeInterceptorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DebugInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
