import React, { useEffect, useState } from 'react';

export default function Opponent(props) {
    const [pokemonName, setPokemonName] = useState('');
    const [moveName, setMoveName] = useState('');
    const [pokemonSprite, setPokemonSprite] = useState('');
    const [pokemonHealth, setPokemonHealth] = useState(100); 
    const [currentHealth, setCurrentHealth] = useState(100);

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/pokemon/${props.name}`;

        const fetchData = async () => {
            try {
                const response = await fetch(url); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPokemonSprite(data.sprites.front_default);
                setPokemonName(data.name);

                const baseHP = Math.floor(0.01*(2 * data.stats[0].base_stat + props.hpIV + Math.floor(0.25 * props.hpEV)) * props.level) + props.level + 10;;
                setPokemonHealth(baseHP);
                setCurrentHealth(baseHP); 
            } catch (error) {
                console.error('There was a problem fetching the Pokémon data:', error);
            }
        };

        fetchData();
    }, []); 

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/move/${props.move}`;

        const fetchData = async () => {
            try {
                const response = await fetch(url); // Fetch data from API
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMoveName(data.accuracy);
            } catch (error) {
                console.error('There was a problem fetching the Pokémon data:', error);
            }
        };

        fetchData();
    }, []); 

    const getHealthColor = () => {
        const healthPercentage = (currentHealth / pokemonHealth) * 100;
        if (healthPercentage > 50) {
            return 'green';
        } else if (healthPercentage > 20) {
            return 'yellow';
        } else {
            return 'red';
        }
    };

    const takeDamage = (damage) => {
        setCurrentHealth(prevHealth => Math.max(prevHealth - damage, 0)); 
    };

    return (
        <div className='battle-container'>
            <h2 className='opponent-name'>{pokemonName.toUpperCase()}</h2>
            <img className='opponent-sprite' src={pokemonSprite} alt={`${pokemonName} sprite`} />

            <div className="health-bar-container">
                <div className="health-text">
                    HP: {currentHealth} / {pokemonHealth}
                </div>
                <div className="health-bar-outline">
                    <div
                        className="health-bar-fill"
                        style={{
                            width: `${(currentHealth / pokemonHealth) * 100}%`, // Dynamic width based on current health
                            backgroundColor: getHealthColor(), // Color based on current health percentage
                        }}
                    />
                </div>
            </div>

            <button onClick={() => takeDamage(20)}>Take 20 damage</button>
        </div>
    );
}