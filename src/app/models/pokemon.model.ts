export interface Pokemon {
  id: string;
  name: string;
  url: string;
  image: string;
}

export interface PokemonResponse {
  results: Pokemon[];
}
