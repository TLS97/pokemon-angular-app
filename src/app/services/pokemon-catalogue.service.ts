import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon, PokemonResponse } from '../models/pokemon.model';
import { StorageUtil } from '../utils/storage.util';

const{ apiPokemon } = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {
 
  private _pokemons: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  constructor(private readonly http: HttpClient) { }

  get pokemons() {
    return this._pokemons;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }

  private getIdAndImage(url: string): any {
    const id = url.split('/').filter(Boolean).pop()
    return {
      id,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    }
  }

  private insertIdAndImage(_pokemons: Pokemon[]) {
    const pokemons : Pokemon[] = [];
    for (let pokemon of _pokemons) {
      const {id, image} = this.getIdAndImage(pokemon.url);
      pokemon = { ...pokemon, id, image};
      pokemons.push(pokemon);
    }
    return pokemons;
  }

  public getPokemons(): void {

    if (this._pokemons.length > 0 || this.loading) {
      return
    }

    this._loading = true;
    this.http.get<PokemonResponse>(apiPokemon)
    .pipe(
      finalize(() => {
        this._loading = false;
        this._pokemons = this.insertIdAndImage(this._pokemons)
        StorageUtil.storageSave(StorageKeys.Pokemons, this._pokemons);
      })
    )
    .subscribe({
      next: (response: PokemonResponse) => {
        this._pokemons = response.results;
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }

  public pokemonById(id: string) : Pokemon | undefined {
    return this._pokemons.find((pokemon: Pokemon) => pokemon.id === id);
  }
}
