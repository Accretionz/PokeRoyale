import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Opponent from "./components/Opponent";
import Player from "./components/Player";
import GameSetup from "./components/GameSetup";
import opponentPokemonList from "./components/OpponentPokemon";
import Title from "./components/Title";

export default function App() {
    const [team, setTeam] = useState([]);

    // Load team from localStorage
    useEffect(() => {
        const savedTeam = JSON.parse(localStorage.getItem('pokemonTeam'));
        if (savedTeam) {
            setTeam(savedTeam);
        }
    }, []);

    const firstPokemon = opponentPokemonList.pokemon4.name;
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Title />} />
                <Route
                    path="/opponent"
                    element={
                        <>
                            <Opponent
                                name={firstPokemon.toLowerCase()}
                                hpIV={0}
                                hpEV={0}
                                level={50}
                            />
                            <Player team={team} />
                        </>
                    }
                />
                <Route
                    path="/gameSetup"
                    element={
                        <>
                            <GameSetup />
                        </>
                    }
                />
            </Routes>
        </Router>
    )
}