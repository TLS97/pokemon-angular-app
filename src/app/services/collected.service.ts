import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { TrainerService } from './trainer.service';

const {apiKey, apiTrainers} = environment

@Injectable({
  providedIn: 'root'
})
export class CollectedService {

  constructor(
    private readonly http: HttpClient,
    private readonly pokemonService: PokemonCatalogueService,
    private readonly trainerService: TrainerService,
  ) { }

  public addToCollected(pokemonId: string): Observable<any> {

    if (!this.trainerService.trainer) {
      throw new Error("addToCollected: There is no trainer")
    }

    const trainer: Trainer = this.trainerService.trainer;
    const selectedPokemon: Pokemon | undefined = this.pokemonService.pokemonById(pokemonId)

    if(!selectedPokemon){
      throw new Error("addToCollected: No pokemon with id: " + pokemonId)
    }

    if(this.trainerService.inCollected(pokemonId)) {
      this.trainerService.removeFromFavorites(pokemonId);
    } else {
      this.trainerService.addToFavorites(selectedPokemon);
    }

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey
    })

    return this.http.patch<Trainer>(`${apiTrainers}/${trainer.id}`, {
      pokemon: [...trainer.pokemon]
    }, {
      headers
    })
    .pipe(
      tap((updatedTrainer: Trainer) => {
        this.trainerService.trainer = updatedTrainer;
      })
    )
  }
}
