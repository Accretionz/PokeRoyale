import React, { useState, useEffect } from 'react';
import MoveButton from './Moves';

export default function GameSetup() {
    const [team, setTeam] = useState([]);

    // Function to save team to localStorage
    const saveTeamToLocalStorage = (team) => {
        localStorage.setItem('pokemonTeam', JSON.stringify(team));
    };

    const getRandomMoves = (moves, numMoves = 4) => {
        const shuffledMoves = moves.sort(() => 0.5 - Math.random()); // Shuffle the moves
        return shuffledMoves.slice(0, numMoves).map(moveObj => moveObj.move.name); // Return up to 4 moves
    };

    const fetchMoveDetails = async (moveName) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
            const data = await response.json();
            return data.type.name;  // Return the move's type
        } catch (error) {
            console.error(`Error fetching move data for ${moveName}:`, error);
            return 'normal';  // Default to normal if fetching fails
        }
    };

    // Function to fetch a random team of Pokémon
    const fetchRandomPokemon = async () => {
        const randomPokemonIds = Array.from({ length: 6 }, () => Math.floor(Math.random() * 1025) + 1);

        const promises = randomPokemonIds.map(async (id) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch data for Pokémon ID: ${id}`);
            }
            return await response.json();
        });

        const pokemonData = await Promise.all(promises);
        

        const newTeam = pokemonData.map((pokemon) => {
            const moves = pokemon.moves.length > 0 ? getRandomMoves(pokemon.moves) : ['No moves available'];

            return {
                name: pokemon.name,
                sprite: pokemon.sprites.front_default,
                moves: moves,
            };
        });

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
                        <div className="moves">
                            {pokemon.moves.map((move, moveIndex) => (
                                <MoveButton 
                                    key={moveIndex}
                                    moveName={move}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
