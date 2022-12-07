import { createContext, useState, useEffect } from "react";
import { GameAPI } from "../api/gameAPI";
import { redirect } from "react-router-dom";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [gameData, setGameData] = useState({});
  const [success, setSuccess] = useState(false);
  //const navigate = useLocation();

  const getGames = async () => {
    try {
      const res = await GameAPI.getGames();
      const { data } = res;
      setGames(data.data);
    } catch (err) {
      if (err.response.data === "Invalid token") {
        sessionStorage.removeItem("user");
        return <redirect to="/" />;
      }
    }
  };

  useEffect(() => {
    getGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editGame = async (event) => {
    const id = event.target.parentNode.getAttribute("data");
    const res = await GameAPI.getGame(id);
    const { data } = res;
    console.log(data.data);
    setGameData(data.data);
  };

  const deleteGame = async (event) => {
    const id = event.target.parentNode.getAttribute("data");
    try {
      /* const res = */ await GameAPI.deleteGame(id);
    } catch (err) {
      console.log(err);
    }
  };

  const createGame = async (data) => {
    try {
      /* const res = */ await GameAPI.createGame(data);
      setSuccess(true);
    } catch (err) {
      console.log(err.response);
      setSuccess(false);
    }
  };

  const updateGame = async (id, data) => {
    try {
      /* const res = */ await GameAPI.updateGame(id, data);
      setSuccess(true);
    } catch (err) {
      console.log(err.response);
      setSuccess(false);
    }
  };

  return (
    <GameContext.Provider
      value={{
        games,
        success,
        getGames,
        gameData,
        editGame,
        deleteGame,
        createGame,
        updateGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
