import { CreateNoteDTO } from "@/utils/types";
import { api } from "./api";

export const createNote = async (data: CreateNoteDTO) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Usuário não autenticado");
    }

    const response = await api.post("/notes", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};


export const getNotes = async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/notes", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
}

export const deleteNote = async (id: string) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;

};