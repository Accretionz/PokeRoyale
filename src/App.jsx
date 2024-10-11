import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Opponent from "./components/Opponent";
import Player from "./components/Player";
import GameSetup from "./components/GameSetup";
import opponentPokemonList from "./components/OpponentPokemon";
import Title from "./components/Title";

export default function App() {
    const firstPokemon = opponentPokemonList.pokemon4.name;
    const firstMove = opponentPokemonList.pokemon1.moves1;
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
                                move={firstMove}
                                hpIV={0}
                                hpEV={0}
                                level={100}
                            />
                            <Player 
                                name="lugia"
                            />
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