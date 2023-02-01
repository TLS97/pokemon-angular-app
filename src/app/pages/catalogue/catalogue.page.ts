import { Component, OnInit } from '@angular/core';
import { PokemonResponse } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css']
})
export class CataloguePage implements OnInit{

  get pokemons(): any {
    return this.pokemonCatalogueService.pokemons;
  }

  get error(): string {
    return this.pokemonCatalogueService.error;
  }

  get loading(): boolean {
    return this.pokemonCatalogueService.loading;
  }

  constructor(
    private readonly pokemonCatalogueService: PokemonCatalogueService,
  ){}

  ngOnInit(): void {
    this.pokemonCatalogueService.getPokemons();
  }

} 
