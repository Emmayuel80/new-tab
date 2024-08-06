import React from "react";
import getRandomIntPokemon from "../services/getRandomIntPokemon";

const Pokedex = () => {
  const [pokemon, setPokemon] = React.useState({});
  async function getPokemon() {
    // check if today is a new day
    const today = new Date();
    const todayString = today.toDateString();
    const lastDate = localStorage.getItem("lastDate");
    if (todayString === lastDate) {
      const pokemon = JSON.parse(localStorage.getItem("pokemon"));
      setPokemon(pokemon);
      return;
    }
    localStorage.setItem("lastDate", todayString);
    // delete pokemon to retreave a new one
    localStorage.removeItem("pokemon");
    const pokemonData = await fetch(
      "https://pokeapi.co/api/v2/pokemon-species/" +
        getRandomIntPokemon(1, 1164)
    )
      .then((res) => res.json())
      .then((data) => data);

    const pokemon = {
      name: pokemonData.name,
      id: pokemonData.id,
      description: "",
    };
    pokemonData.flavor_text_entries.forEach((entry) => {
      if (entry.language.name === "en") {
        pokemon.description = entry.flavor_text;
      }
    });
    localStorage.setItem("pokemon", JSON.stringify(pokemon));
    setPokemon(pokemon);
  }

  React.useEffect(() => {
    getPokemon();
  }, []);
  return (
    <div>
      <div className="flex mt-8">
        <div className="max-w-sm bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <h1 className="text-4xl text-white text-center mt-8">
            Pokemon of the Day
          </h1>
          <div className="p-8">
            <img
              className="mx-auto"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={pokemon.name}
            />
            <h2 className="text-2xl text-white text-center mt-2 capitalize">
              {pokemon.name}
            </h2>
            <p className="text-white text-center mt-2">{pokemon.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokedex;
