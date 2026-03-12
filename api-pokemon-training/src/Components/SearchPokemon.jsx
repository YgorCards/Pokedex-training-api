import { useState } from "react";

function PokemonSearch() {

const [pokemonName, setPokemonName] = useState("");
const [pokemonData, setPokemonData] = useState(null);
const [error, setError] = useState("");

async function fetchPokemon(){

if (!pokemonName.trim()){
  setError("Please enter a Pokemon name");
  setPokemonData(null);
  return
}  


setError("");
setPokemonData(null);

try{

const response = await fetch(
`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
);

if(!response.ok){
throw new Error("Pokemon not found");
}

const data = await response.json();
setPokemonData(data);

}catch{
setError("Pokemon not found ❌");
}

}

return (

<div className="card">

<h2>Pokedex</h2>

<div className="search-box">

<input
type="text"
placeholder="Enter Pokémon name"
value={pokemonName}
onChange={(e)=>setPokemonName(e.target.value)}
/>

<button onClick={fetchPokemon}>
Search
</button>

</div>

{error && <p>{error}</p>}

{pokemonData && (

<div className="pokemon-result">

<h3>{pokemonData.name}</h3>

<img
src={pokemonData.sprites.front_default}
alt={pokemonData.name}
/>

<p>Height: {pokemonData.height}</p>
<p>Weight: {pokemonData.weight}</p>

</div>

)}

</div>

)

}

export default PokemonSearch;
