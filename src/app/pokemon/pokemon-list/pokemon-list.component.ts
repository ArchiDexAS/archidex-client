import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, map, of, switchMap } from 'rxjs';
import { Dtopoke } from 'src/app/model/dtopoke';
import { Pokemon } from 'src/app/model/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.sass']
})
export class PokemonListComponent implements OnInit {

  pokemon: Pokemon[] | undefined;
  infoPoke: Dtopoke[] = [];

  inputSearch: string | undefined = "";
  filter: string | undefined = "";
  value: string | undefined;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
    private utils: Utils,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {  
      this.filter = params.get('filter')!;
      this.value = params.get('value')!;
    });
    if(!this.filter && !this.value){
      this.pokemonService.list().subscribe(pokes => {
        this.pokemon = pokes
        const observables = this.pokemon.map(poke => {
          return this.pokemonService.typesPokemon(poke.idPokedex);
        });
        forkJoin(observables).subscribe(typesArray => {
          this.infoPoke = typesArray.map((types, index) => {
            const poke: Pokemon = this.pokemon![index];
            return new Dtopoke(poke.idPokedex, poke.name, types);
          });
          this.urlImages();
        });  
      });
    }else{
      if(this.filter == "type"){
        this.pokemonService.pokemonFromType(+this.value!).subscribe(pokes => {
          this.pokemon = pokes
        const observables = this.pokemon.map(poke => {
          return this.pokemonService.typesPokemon(poke.idPokedex);
        });
        forkJoin(observables).subscribe(typesArray => {
          this.infoPoke = typesArray.map((types, index) => {
            const poke = this.pokemon![index];
            return new Dtopoke(poke.idPokedex, poke.name, types);
          });
          this.urlImages();
        });
        });
      } else{
        this.pokemonService.pokemonFromWord(this.value!).subscribe(pokes => {
          this.pokemon = pokes
        const observables = this.pokemon.map(poke => {
          return this.pokemonService.typesPokemon(poke.idPokedex);
        });
        forkJoin(observables).subscribe(typesArray => {
          this.infoPoke = typesArray.map((types, index) => {
            const poke = this.pokemon![index];
            return new Dtopoke(poke.idPokedex, poke.name, types);
          });
          this.urlImages();
        });
        });
      }
    }
  }

  public typeList(id: number){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['pokemon/list/type', id]);
    });
  }

  public urlImages(){
    this.infoPoke.map(pokeTable =>{
      this.pokemonService.pokeImage(pokeTable.idPokedex).subscribe(urlPkmn => {
        pokeTable.urlPoke = urlPkmn
      });
      pokeTable.types.map(typeTable =>{
        this.pokemonService.typeImage(typeTable.name).subscribe(urlType => {
          typeTable.urlType = urlType;
        });
      });
    });
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
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['pokemon/list/name', this.inputSearch]);
          });
        }});
      }else{
        this.pokemonService.pokemonById(+this.inputSearch).pipe(
          map(pok => pok.idPokedex)
        ).subscribe({
          next: poke => {
          this.router.navigate(['pokemon/display', poke]);
        }, error: (e) => {
          this.router.navigate(['home', this.inputSearch]);
        }});
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
