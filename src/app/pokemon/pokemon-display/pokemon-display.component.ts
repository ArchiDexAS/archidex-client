import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  sWeak: Type[] | undefined;
  weak: Type[] | undefined;
  dNormal: Type[] | undefined;
  res: Type[] | undefined;
  sRes: Type[] | undefined;
  inm: Type[] | undefined;

  // Strengths
  efc: Type[] | undefined;
  aNormal: Type[] | undefined;
  nEfc: Type[] | undefined;
  nDam: Type[] | undefined;

  inputSearch: string | undefined = "";

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private utils: Utils
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // TO-DO SEARCH FOR POKE INFO (FILL THE ARRAYS)
      params.get('id')!;
    });
  }

  onSubmit(){
    if(this.inputSearch){
      if(isNaN(+this.inputSearch)){
        // TO-DO NOT NUMBER
      }else{
        // TO-DO NUMBER
      }
    }
  }

  onRandomSubmit(){
    let randomPoke: number = this.utils.generateRandomNumber(1, 151);
    // TO-DO NUMBER
  }

}
