import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { type Game } from "../data/games";

function GameDetails() {
    const { id } = useParams();
    const [game, setGame] = useState<Game | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`https://www.freetogame.com/api/game?id=${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Could not fetch game details");
                return res.json();
            })
            .then(data => {
                setGame(data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return <div className="container py-5 text-center"><div className="spinner-border text-primary" role="status"></div></div>;
    }

    if (error || !game) {
        return <div className="container py-5 text-center text-danger">Game not found</div>;
    }

    return (
        <div className="container py-5" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>
            <Link to="/" className="btn btn-primary mb-4">&larr; Back to Games</Link>
            <div className="row">
                <div className="col-md-5 mb-4">
                    <img src={game.thumbnail} alt={game.title} className="img-fluid rounded shadow" />
                </div>
                <div className="col-md-7">
                    <h1 style={{ fontWeight: 800, fontSize: '3.5rem', marginBottom: '30px' }}>{game.title}</h1>
                    <p className="fs-5">{game.short_description}</p>
                    <hr />
                    <p className="fs-4"><strong>Genre:</strong> {game.genre}</p>
                    <p className="fs-4"><strong>Platform:</strong> {game.platform}</p>
                    <p className="fs-4"><strong>Publisher:</strong> {game.publisher}</p>
                    <p className="fs-4"><strong>Developer:</strong> {game.developer}</p>
                    <p className="fs-4"><strong>Release Date:</strong> {game.release_date}</p>
                    <a href={game.game_url} target="_blank" rel="noreferrer" className="btn btn-primary btn-lg mt-3">Play Now</a>
                </div>
            </div>
        </div>
    );
}

export default GameDetails;