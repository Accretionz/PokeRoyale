import React, { useState, useEffect } from 'react';

const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
};

const MoveButton = ({ moveName }) => {
    const [moveType, setMoveType] = useState('normal');  // Default type

    useEffect(() => {
        // Fetch move details when component mounts or moveName changes
        const fetchMoveDetails = async (moveName) => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`);
                const data = await response.json();
                setMoveType(data.type.name);  // Set the move type
            } catch (error) {
                console.error(`Error fetching move data for ${moveName}:`, error);
                setMoveType('normal');  // Default to normal if fetching fails
            }
        };

        if (moveName) {
            fetchMoveDetails(moveName);
        }
    }, [moveName]);

    return (
        <button
            style={{ backgroundColor: typeColors[moveType] || '#A8A77A' }}
            className="move-button"
        >
            {moveName.toUpperCase()}
        </button>
    );
};

export default MoveButton;
