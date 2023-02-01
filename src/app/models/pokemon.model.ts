export interface Pokemon {
  id: string;
  name: string;
  url: string;
  image: string;
  type: string;
  height: number; 
}

export interface PokemonResponse {
  results: Pokemon[];
}
