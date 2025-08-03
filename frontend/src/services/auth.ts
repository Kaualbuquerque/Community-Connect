// src/services/registerUser.ts
import { api } from './api'; // Assumindo que 'api' é uma instância configurada do Axios
import axios from 'axios';

interface RegisterData {
    name: string;
    email: string;
    password: string;
    phone: string;
    role: 'consumer' | 'provider';
    cep: string;
    state: string;
    city: string;
    number: string;
}

export async function registerUser(data: RegisterData) {
    console.log("📤 Enviando dados para o backend:");
    console.table(data); // Mostra dados em formato de tabela

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

        // Rejeita o erro para que o componente que chamou trate (ex: exibir mensagem ao usuário)
        throw error;
    }
}
