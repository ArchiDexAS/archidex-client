import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DtoTypevsType } from '../model/dto-typevs-type';
import { Pokemon } from '../model/pokemon';
import { Type } from '../model/type';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(private http: HttpClient) { }

  list(): Observable<Pokemon[]> {
    return this.http.get<any>(`http://10.43.101.95:8000/api/getAllPokemons/`).pipe(
      map(datos => {
        return datos.data;
      })
    );
  }

  listTypes(): Observable<Type[]> {
    return this.http.get<any>(`http://10.43.101.95:8000/api/getAllTypes/`).pipe(
      map(datos => {
        return datos.data;
      })
    );
  }

  typesPokemon(id: number): Observable<Type[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("idPokedex", id);
    return this.http.get<any>(`http://10.43.101.95:8000/api/getTypesForPokemon/`, { params: queryParams }).pipe(
      map(datos => {
        return datos.data;
      })
    );
  }

  pokemonByName(name: string): Observable<Pokemon> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("name", name);
    return this.http.get<any>(`http://10.43.101.95:8000/api/getPokemonByName/`, { params: queryParams }).pipe(
      map(datos => {
        return datos.data;
      })
    );
  }

  pokemonById(id: number): Observable<Pokemon> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("idPokedex", id);
    return this.http.get<any>(`http://10.43.101.95:8000/api/getPokemonById/`, { params: queryParams }).pipe(
      map(datos => {
        return datos.data;
      })
    );
  }

  typeById(id: number): Observable<Type> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("idType", id);
    return this.http.get<any>(`http://10.43.101.95:8000/api/getTypeById/`, { params: queryParams }).pipe(
      map(datos => {
        return datos.data;
      })
    );
  }

  pokemonFromType(id: number): Observable<Pokemon[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("idType", id);
    return this.http.get<any>(`http://10.43.101.95:8000/api/getPokemonsFromType/`, { params: queryParams }).pipe(
      map(datos => {
        return datos.data;
      })
    );
  }

  pokemonFromWord(word: string): Observable<Pokemon[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("word", word);
    return this.http.get<any>(`http://10.43.101.95:8000/api/getPokemonsFromWord/`, { params: queryParams }).pipe(
      map(datos => {
        return datos.data;
      })
    );
  }

  strengthsPokemon(id: number): Observable<DtoTypevsType[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("idPokedex", id);
    return this.http.get<any>(`http://10.43.101.95:8000/api/getPokemonAttachDefenseData/`, { params: queryParams }).pipe(
      map(datos => {
        return datos.attackData;
      })
    );
  }

  weaknessPokemon(id: number): Observable<DtoTypevsType[]> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("idPokedex", id);
    return this.http.get<any>(`http://10.43.101.95:8000/api/getPokemonAttachDefenseData/`, { params: queryParams }).pipe(
      map(datos => {
        return datos.defenseData;
      })
    );
  }
}
