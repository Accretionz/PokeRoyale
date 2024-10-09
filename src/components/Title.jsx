import { Link } from "react-router-dom";
export default function () {
    return (
        <div className="container">
            <h1 className="title">Poke Royale</h1>
            <Link to="/opponent">
                <button className="start">Start Game</button>
            </Link>
        </div>
    )
}