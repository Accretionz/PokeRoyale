import React, { useState, useEffect } from 'react';

export default function GameSetup() {
    const [team, setTeam] = useState([]);

    // Function to save team to localStorage
    const saveTeamToLocalStorage = (team) => {
        localStorage.setItem('pokemonTeam', JSON.stringify(team));
    };

    // Function to fetch a random team of Pokémon
    const fetchRandomPokemon = async () => {
        const randomPokemonIds = Array.from({ length: 6 }, () => Math.floor(Math.random() * 898) + 1); // 898 is the max Pokémon ID as of Gen 8

        const promises = randomPokemonIds.map(async (id) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch data for Pokémon ID: ${id}`);
            }
            return await response.json();
        });

        const pokemonData = await Promise.all(promises);

        const newTeam = pokemonData.map((pokemon) => ({
            name: pokemon.name,
            sprite: pokemon.sprites.front_default,
        }));

        // Update team state and save to localStorage
        setTeam(newTeam);
        saveTeamToLocalStorage(newTeam);
    };

    // On component mount, retrieve the saved team from localStorage (if any)
    useEffect(() => {
        const savedTeam = JSON.parse(localStorage.getItem('pokemonTeam'));
        if (savedTeam) {
            setTeam(savedTeam);
        }
    }, []);

    return (
        <div className="gameSetup-container">
            <h1 className="gameSetup-title">RANDOMIZER</h1>
            <button className="gameSetup-random" onClick={fetchRandomPokemon}>
                Randomize Team
            </button>

            <div className="team-container">
                {team.length > 0 && team.map((pokemon, index) => (
                    <div key={index} className="user-pokemon">
                        <h3>{pokemon.name.toUpperCase()}</h3>
                        <img src={pokemon.sprite} alt={`${pokemon.name} sprite`} />
                    </div>
                ))}
            </div>
        </div>
    );
}
