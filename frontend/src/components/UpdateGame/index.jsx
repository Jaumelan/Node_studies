import { useContext, useState, useEffect } from "react";
import { GameContext } from "../../context/gameContext";
import { Button } from "../Button";

const UpdateGame = () => {
  const { updateGame, gameData } = useContext(GameContext);
  const [data, setData] = useState({ title: "", price: "", year: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    updateGame(gameData.id, data);
    setData({ title: "", price: "", year: "" });
  };

  useEffect(() => {
    if (gameData && gameData.title) {
        console.log(gameData)
      setData({
        title: gameData.title,
        year: gameData.year,
        price: gameData.price,
      });
    }
  }, [gameData]);

  return (
    <div>
      <h2>Atualizar jogo</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Nome</label>
        <input
          type="text"
          name="title"
          id="title"
          value={data.title}
          onChange={handleChange}
        />
        <label htmlFor="price">Preço</label>
        <input
          type="number"
          name="price"
          id="price"
          value={data.price}
          onChange={handleChange}
        />
        <label htmlFor="year">Ano</label>
        <input
          type="number"
          name="year"
          id="year"
          value={data.year}
          onChange={handleChange}
        />
        <Button text="Submit" />
      </form>
    </div>
  );
};

export { UpdateGame };
