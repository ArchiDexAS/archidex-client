import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { values } from 'lodash';
import { map } from 'rxjs';
import { DtoType } from 'src/app/model/dto-type';
import { DtoTypevsType } from 'src/app/model/dto-typevs-type';
import { Pokemon } from 'src/app/model/pokemon';
import { Type } from 'src/app/model/type';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-pokemon-display',
  templateUrl: './pokemon-display.component.html',
  styleUrls: ['./pokemon-display.component.sass']
})
export class PokemonDisplayComponent implements OnInit {

  pokemon: Pokemon | undefined;
  types: Type[] | undefined;

  // Weaknesses
  sWeak: DtoType[] = [];
  weak: DtoType[] = [];
  dNormal: DtoType[] = [];
  res: DtoType[] = [];
  sRes: DtoType[] = [];
  inm: DtoType[] = [];

  // Strengths
  efc: DtoType[] = [];
  aNormal: DtoType[] = [];
  nEfc: DtoType[] = [];
  nDam: DtoType[] = [];

  inputSearch: string | undefined = "";

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
    private utils: Utils
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // TO-DO SEARCH FOR POKE INFO (FILL THE ARRAYS)
      this.pokemonService.pokemonById(+params.get('id')!).subscribe(poke => {
        this.pokemon = poke
        this.pokemonService.strengthsPokemon(this.pokemon.idPokedex).subscribe(strong => {
          this.joinStrengths(strong)
        });
        this.pokemonService.weaknessPokemon(this.pokemon.idPokedex).subscribe(weak => {
          this.joinWeakness(weak)
        });
      })
      
    });
  }

  joinWeakness(weakness: DtoTypevsType[]){
    if(weakness.length >18){
      for(let i = 1; i<19; i++){
        this.pokemonService.typeById(i).subscribe(typ => {
          const numValue = weakness.filter(wk => wk.attackerId==i).map(weakness => weakness.value).reduce(function (previous, current) {
            return previous * current;
        }, 1)
          this.calculateWeakness(new DtoType(typ.idType, typ.name, numValue))
        });
      }
    }else{
      weakness.forEach(wk => {
       this.pokemonService.typeById(wk.attackerId).subscribe(type => {
          this.calculateWeakness(new DtoType(type.idType, type.name, wk.value))
        })
      })
    }
  }

  joinStrengths(strengths: DtoTypevsType[]){
    if(strengths.length >18){
      for(let i = 1; i<19; i++){
        this.pokemonService.typeById(i).subscribe(typ => {
          const numValue = strengths.filter(st => st.defenderId==i).map(streng => streng.value).reduce(function (previous, current) {
            return previous * current;
        }, 1)
          this.calculateStrengths(new DtoType(typ.idType, typ.name, numValue))
        });
      }
    }else{
      strengths.forEach(st => {
       this.pokemonService.typeById(st.defenderId).subscribe(type => {
          this.calculateStrengths(new DtoType(type.idType, type.name, st.value))
        })
      })
    }
  }

  calculateWeakness(typeWeaks: DtoType){
    if(typeWeaks.value == 4){
      this.sWeak.push(typeWeaks);
    }else if(typeWeaks.value == 2){
      this.weak.push(typeWeaks);
    }else if(typeWeaks.value == 1){
      this.dNormal.push(typeWeaks);
    }else if(typeWeaks.value == 0.5){
      this.res.push(typeWeaks);
    }else if(typeWeaks.value == 0){
      this.inm.push(typeWeaks)
    }else{
      this.sRes.push(typeWeaks)
    }
  }


  calculateStrengths(typeStrengths: DtoType){
    if(typeStrengths.value == 4){
      this.efc.push(typeStrengths);
    }else if(typeStrengths.value == 2){
      this.efc.push(typeStrengths);
    }else if(typeStrengths.value == 1){
      this.aNormal.push(typeStrengths);
    }else if(typeStrengths.value == 0.5){
      this.nEfc.push(typeStrengths);
    }else if(typeStrengths.value == 0){
      this.nDam.push(typeStrengths)
    }else{
      this.nEfc.push(typeStrengths)
    }
  }

  onSubmit(){
    if(this.inputSearch){
      if(isNaN(+this.inputSearch)){
        this.pokemonService.pokemonByName(this.inputSearch).pipe(
          map(pok => pok.idPokedex)
        ).subscribe({
          next: poke => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['pokemon/display', poke]);
            });
        }, error: (e) => {
          this.router.navigate(['pokemon/list/name', this.inputSearch]);
        }});
      }else{
        // TO-DO NUMBER
      }
    }
  }

  onRandomSubmit(){
    let randomPoke: number = this.utils.generateRandomNumber(1, 151);
    this.pokemonService.pokemonById(randomPoke).subscribe(poke => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['pokemon/display', poke.idPokedex]);
      });
    });
  }

}
