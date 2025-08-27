import { api } from "./api";

export const getConversations = async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/conversations", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
}

export const getMessages = async (conversationId: number) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`/conversations/${conversationId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data.messages;
}