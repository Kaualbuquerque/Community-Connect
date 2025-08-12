// src/services/registerUser.ts
import { LoginData, RegisterData } from '@/utils/types';
import { api } from './api'; // Assumindo que 'api' é uma instância configurada do Axios
import axios from 'axios';



export async function registerUser(data: RegisterData) {
    console.log("📤 Enviando dados para o backend:");
    console.table(data);

    try {
        const response = await api.post('/auth/register', data);

        console.log("✅ Registro realizado com sucesso:");
        console.log("Status:", response.status);
        console.log("Resposta:", response.data);

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("❌ Erro na requisição Axios:");
            console.error("Status:", error.response?.status);
            console.error("Dados do erro:", error.response?.data);
        } else {
            console.error("❌ Erro inesperado:", error);
        }

        throw error;
    }
}

export async function loginUser(data: LoginData) {
    try {
        const response = await api.post('/auth/login', data);
        return response.data;
    } catch (error: any) {
        throw error?.response?.data?.message || "Erro ao fazer login";
    }
}
