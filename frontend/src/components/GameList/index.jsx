import { useEffect, useContext } from "react";
import { GameContext } from "../../context/gameContext";
import { Button } from "../../components";

const GameList = () => {
  const { games, getGames, editGame, deleteGame } = useContext(GameContext);

  useEffect(() => {
    getGames();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Game List</h1>
      <Button handleClick={getGames} text="Refresh Games" />
      <ol>
        {games.map((game) => {
          return (
            <li key={game.id} data={game.id}>
              {`${game.title} - Price: $${game.price}`}
              <Button text="Edit" handleClick={editGame} />
              <Button text="Delete" handleClick={deleteGame} />
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export { GameList };
