//import { useState } from "react";
import { Header, GameList, CreateGame, UpdateGame } from "../../components";

const Home = () => {
  return (
    <div>
      <Header />
      <GameList />
      <CreateGame />
      <UpdateGame />
    </div>
  );
};

export { Home };
