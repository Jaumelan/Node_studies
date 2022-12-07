import { api } from "./config";

export const UserAPI = {
    login: async(data) => {
        const response = await api.post("/auth", data);
        return response;
    },
    register: async(data) => {
        const response = await api.post("/register", data);
        return response;
    }
} 