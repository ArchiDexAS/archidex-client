import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { PokemonDisplayComponent } from './pokemon/pokemon-display/pokemon-display.component';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'pokemon/list', component: PokemonListComponent },
  { path: 'pokemon/list/:filter/:value', component: PokemonListComponent },
  { path: 'pokemon/display/:id', component: PokemonDisplayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
