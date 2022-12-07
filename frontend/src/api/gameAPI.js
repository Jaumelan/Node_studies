import { api } from "./config";

export const GameAPI = {
  getGames: async () => {
    const token = sessionStorage.getItem("user");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get("/games");
    return response;
  },
  getGame: async (id) => {
    const token = sessionStorage.getItem("user");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.get(`/game/${id}`);
    return response;
  },
  createGame: async (data) => {
    const token = sessionStorage.getItem("user");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.post("/game", data);
    return response;
  },
  updateGame: async (id, data) => {
    const token = sessionStorage.getItem("user");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.put(`/game/${id}`, data);
    return response;
  },
  deleteGame: async (id) => {
    const token = sessionStorage.getItem("user");
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await api.delete(`/game/${id}`);
    return response;
  },
};
