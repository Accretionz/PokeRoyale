import React, { useEffect, useState } from 'react';

export default function Player({ team }) {
    return (
        <div className="team-container">
            {/* Render all Pokémon in the player's team */}
            {team.length > 0 && team.map((pokemon, index) => (
                <div key={index} className="user-pokemon">
                    <h2>{pokemon.name.toUpperCase()}</h2>
                    <img src={pokemon.sprite} alt={`${pokemon.name} sprite`} />
                </div>
            ))}
        </div>
    );
}

// export default function Player(props) {
//     const [pokemonName, setPokemonName] = useState('');
//     const [pokemonSprite, setPokemonSprite] = useState('');

//     useEffect(() => {
//         const url = `https://pokeapi.co/api/v2/pokemon/${props.name}`;

//         const fetchData = async () => {
//             try {
//                 const response = await fetch(url); 
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 setPokemonSprite(data.sprites.front_default);
//                 setPokemonName(data.name);

//                 const baseHP = Math.floor(0.01*(2 * data.stats[0].base_stat + props.hpIV + Math.floor(0.25 * props.hpEV)) * props.level) + props.level + 10;;
//                 setPokemonHealth(baseHP);
//                 setCurrentHealth(baseHP); 
//             } catch (error) {
//                 console.error('There was a problem fetching the Pokémon data:', error);
//             }
//         };

//         fetchData();
//     }, []); 

//     return (
//         <div>
//             <h2>{pokemonName.toUpperCase()}</h2>
//             <img src={pokemonSprite} alt={`${pokemonName} sprite`} />
//         </div>
//     )
// }