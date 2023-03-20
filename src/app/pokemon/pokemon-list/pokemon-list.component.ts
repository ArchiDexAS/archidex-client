import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  infoPoke: Dtopoke[] | undefined;

  inputSearch: string | undefined = "";
  filter: string | undefined = "";
  value: string | undefined = "";

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private router: Router,
    private utils: Utils
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {  
      this.filter = params.get('filter')!;
      this.value = params.get('value')!;
    });
    if(!this.filter && !this.value){
      // TO-DO Full list
    }else{
      // TO-DO Specific list
    }
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
