import { api } from "./api";

export const addFavorite = async (serviceId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Usuário não autenticado");
    }

    const response = await api.post(`/favorites`, { serviceId }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const getFavorites = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Usuário não autenticado");
    }

    const response = await api.get(`/favorites`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const removeFavorite = async (serviceId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Usuário não autenticado");
    }

    const response = await api.delete(`/favorites/${serviceId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
