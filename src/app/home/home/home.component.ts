import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Type } from 'src/app/model/type';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  types: Type[] | undefined;

  inputSearch: string | undefined = "";
  selectedType: Type | undefined;

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private utils: Utils
  ){}

  ngOnInit(): void {
    this.pokemonService.listTypes().subscribe(types => {
      this.types = types
    })
  }

  onSubmit(){
    if(this.inputSearch){
      if(isNaN(+this.inputSearch)){
        this.pokemonService.pokemonByName(this.inputSearch).pipe(
          map(pok => pok.idPokedex)
        ).subscribe({
          next: poke => {
          this.router.navigate(['pokemon/display', poke]);
        }, error: (e) => {
          this.router.navigate(['pokemon/list/name', this.inputSearch]);
        }});
      }else{
        this.pokemonService.pokemonById(+this.inputSearch).pipe(
          map(pok => pok.idPokedex)
        ).subscribe({
          next: poke => {
          this.router.navigate(['pokemon/display', poke]);
        }, error: (e) => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['home', this.inputSearch]);
          });
        }});
      }
    }else{
      if(this.selectedType){
        this.router.navigate(['pokemon/list/type', this.selectedType.idType]);
      }
    }
  }

  onRandomSubmit(){
    let randomPoke: number = this.utils.generateRandomNumber(1, 151);
    this.pokemonService.pokemonById(randomPoke).subscribe(poke => {
      this.router.navigate(['pokemon/display', poke.idPokedex]);
    });
  }

}
